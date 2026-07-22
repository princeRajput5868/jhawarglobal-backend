import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import sequelize from '../config/db.js';
import AdminUser from '../models/AdminUser.js';

dotenv.config();

const run = async () => {
  try {
    await sequelize.authenticate();

    const newPassword = 'Admin@123';
    const hash = await bcrypt.hash(newPassword, 10);

    const [admin, created] = await AdminUser.findOrCreate({
      where: { username: 'admin' },
      defaults: {
        username: 'admin',
        email: 'admin@example.com',
        passwordHash: hash,
        role: 'admin',
        isActive: true,
      },
    });

    if (!created) {
      admin.passwordHash = hash;
      await admin.save();
      console.log('Existing admin password updated!');
    } else {
      console.log('New admin created!');
    }

    console.log('Username: admin');
    console.log('Password:', newPassword);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run(); 