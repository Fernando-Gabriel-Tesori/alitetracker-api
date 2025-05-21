import { Request, Response } from 'express';
import { z } from 'zod';
import { habitModel } from '../models/habit.model';
import { buildValidationErrorMessage } from '../utils/build-validation-error-message-util';
import dayjs from 'dayjs';
import mongoose from 'mongoose';

export class HabitsController {
  store = async (request: Request, response: Response): Promise<Response> => {
    const schema = z.object({
      name: z.string(),
    });

    const habit = schema.safeParse(request.body);

    if (!habit.success) {
      const errors = buildValidationErrorMessage(habit.error.issues);

      return response.status(400).json({ message: errors });
    }

    const findHabit = await habitModel.findOne({
      name: habit.data.name,
    });

    if (findHabit) {
      return response.status(422).json({ message: 'Habit already exists.' });
    }

    const newHabit = await habitModel.create({
      name: habit.data.name,
      completedDates: [],
      userId: request.user.id,
    });

    return response.status(201).json(newHabit);
  };

  index = async (request: Request, response: Response) => {
    const habits = await habitModel
      .find({
        userId: request.user.id,
      })
      .sort({ name: 1 });

    response.status(200).json(habits);
  };

  remove = async (request: Request, response: Response) => {
    const schema = z.object({
      id: z.string(),
    });

    const habit = schema.safeParse(request.params);

    if (!habit.success) {
      const errors = buildValidationErrorMessage(habit.error.issues);

      return response.status(422).json({ message: errors });
    }

    const findHabit = await habitModel.findOne({
      _id: habit.data.id,
      userId: request.user.id,
    });

    if (!findHabit) {
      return response.status(404).json({ message: 'Habti not found.' });
    }

    await habitModel.deleteOne({
      _id: habit.data.id,
    });

    return response.status(204).send();
  };

  toggle = async (request: Request, response: Response) => {
    const schema = z.object({
      id: z.string(),
    });

    const validated = schema.safeParse(request.params);

    if (!validated.success) {
      const errors = buildValidationErrorMessage(validated.error.issues);

      return response.status(422).json({ message: errors });
    }

    const findHabit = await habitModel.findOne({
      _id: validated.data.id,
      userId: request.user.id,
    });

    if (!findHabit) {
      return response.status(404).json({ message: 'Habti not found.' });
    }

    const now = dayjs().startOf('day').toISOString();

    const isHabitCompletedOnDate = findHabit
      .toObject()
      ?.completedDates.find(
        (item) => dayjs(String(item)).toISOString() === now,
      );

    if (isHabitCompletedOnDate) {
      const habitUpdated = await habitModel.findByIdAndUpdate(
        {
          _id: validated.data.id,
        },
        {
          $pull: {
            completedDates: now,
          },
        },
        {
          returnDocument: 'after',
        },
      );

      return response.status(200).json(habitUpdated);
    }

    const habitUpdated = await habitModel.findByIdAndUpdate(
      {
        _id: validated.data.id,
      },
      {
        $push: {
          completedDates: now,
        },
      },
      {
        returnDocument: 'after',
      },
    );

    return response.status(200).json(habitUpdated);
  };

  metrics = async (request: Request, response: Response) => {
    const schema = z.object({
      id: z.string(),
      date: z.coerce.date(),
    });

    const validated = schema.safeParse({ ...request.params, ...request.query });

    if (!validated.success) {
      const errors = buildValidationErrorMessage(validated.error.issues);

      return response.status(422).json({ message: errors });
    }

    const dateFrom = dayjs(validated.data.date).startOf('month');
    const dateTo = dayjs(validated.data.date).endOf('month');

    const [habitMetrics] = await habitModel
      .aggregate()
      .match({
        _id: new mongoose.Types.ObjectId(validated.data.id),
        userId: request.user.id,
      })
      .project({
        _id: 1,
        name: 1,
        completedDates: {
          $filter: {
            input: '$completedDates',
            as: 'completedDate',
            cond: {
              $and: [
                {
                  $gte: ['$$completedDate', dateFrom.toDate()],
                },
                {
                  $lte: ['$$completedDate', dateTo.toDate()],
                },
              ],
            },
          },
        },
      });

    if (!habitMetrics) {
      return response.status(404).json({ message: 'Habti not found.' });
    }

    return response.status(200).json(habitMetrics);
  };
}
