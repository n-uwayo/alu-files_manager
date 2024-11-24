import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import Queue from 'bull';
import dbClient from '../utils/db';
import userUtils from '../utils/user';

const userQueue = new Queue('userQueue');

class UsersController {
  /**
   * Creates a user using email and password
   */
  static async postNew(request, response) {
    const { email, password } = request.body;

    if (!email) return response.status(400).send({ error: 'Missing email' });
    if (!password) return response.status(400).send({ error: 'Missing password' });

    const emailExists = await dbClient.usersCollection.findOne({ email });
    if (emailExists) return response.status(400).send({ error: 'Already exist' });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await dbClient.usersCollection.insertOne({
        email,
        password: hashedPassword,
      });

      const user = {
        id: result.insertedId,
        email,
      };

      await userQueue.add({
        userId: result.insertedId.toString(),
      });

      return response.status(201).send(user);
    } catch (err) {
      await userQueue.add({});
      return response.status(500).send({ error: 'Error creating user.' });
    }
  }

  /**
   * Retrieves the user based on the token used
   */
  static async getMe(request, response) {
    const { userId } = await userUtils.getUserIdAndKey(request);

    const user = await userUtils.getUser({
      _id: ObjectId(userId),
    });

    if (!user) return response.status(401).send({ error: 'Unauthorized' });

    const processedUser = { id: user._id, ...user };
    delete processedUser._id;
    delete processedUser.password;

    return response.status(200).send(processedUser);
  }
}

export default UsersController;
