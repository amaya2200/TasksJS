import { Request, Response } from 'express'
import { authService } from '../services/authService'
import config from "../config/config";
import ms from 'ms';

const authController = {
  
  async register(req: Request, res: Response) {

    try {

      const { username, password } = req.body;

      const user = await authService.register({ username, password });

      res.status(201).json({
        message: 'User created successfully',
        user,
      });

    } catch (error) {

      if(error instanceof Error) {

        res.status(400).json({
          message: error.message || 'Error on registering user',
        })

      } else {

        res.status(500).json({
          message: 'Unexpected error registering user',
        })

      }

    }

  },

  async login(req: Request, res: Response) {

    try {

      const { username, password } = req.body;

      const user = await authService.login({ username, password });

      res.cookie('access_token', user.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ms(config.JWT_EXPIRES_IN),
      });

      res.status(200).json({
        message: 'user logged in successfully',
        userid: user.id,
        username: user.username,
      });

    } catch (error) {

      if(error instanceof Error) {

        res.status(400).json({
          message: error.message || 'Error on logging in',
        })

      } else {

        res.status(500).json({
          message: 'unexpected error logging in',
        })

      }

    }

  },

  async checkSessionStatus(req: Request, res: Response) {
    res.status(200).json({
      isAuthenticated: true,
      username: req.user?.username,
    });
  },

  async logout(req: Request, res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.status(200).json({
      message: 'User logged out successfully',
    });
  },

  async changePassword(req: Request, res: Response) {

    try {

      const { username, oldPassword, newPassword } = req.body;

      const user = await authService.changePassword({ username, oldPassword, newPassword });

      res.status(200).json({
        message: 'Password changed successfully',
        user,
      });

    } catch (error) {

      if(error instanceof Error) {

        res.status(400).json({
          message: error.message || 'Error on changing password',
        })

      } else {

        res.status(500).json({
          message: 'Unexpected error changing password',
        })

      }

    }

  },

};

export default authController;