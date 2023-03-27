import { Request, Response } from 'express';
import { IKata, Kata, KataRequest } from '../models/kata.model';

export async function getKataList(req: Request, res: Response) {
  try {
    const kataList = await Kata.find();

    res.status(200).json(kataList);
  } catch (err) {
    res.status(400).json({ message: 'Cannot get kata list' });
  }
}

export async function getKata(req: Request<KataRequest>, res: Response) {
  try {
    const { id } = req.params;
    const kata = await Kata.findById(id);

    res.status(200).json(kata);
  } catch (err) {
    res.status(400).json({ message: 'Cannot get kata' });
  }
}

export async function createKata(
  req: Request<unknown, unknown, IKata>,
  res: Response
) {
  try {
    const { title, type } = req.body;

    const kata = await Kata.create({
      title,
      type,
    });

    res.status(200).json(kata);
  } catch (err) {
    res.status(400).json({ message: 'Cannot create kata' });
  }
}

export async function updateKata(
  req: Request<KataRequest, unknown, IKata>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { title, type } = req.body;

    const updateFields: IKata = {
      title,
      type,
    };

    const kata = await Kata.findOneAndUpdate({ _id: id }, updateFields, {
      new: true,
    });

    res.status(200).json(kata);
  } catch (err) {
    res.status(400).json({ message: 'Cannot update kata' });
  }
}

export async function deleteKataById(req: Request<KataRequest>, res: Response) {
  try {
    const { id } = req.params;

    await Kata.findByIdAndRemove(id);

    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: 'Cannot delete kata' });
  }
}
