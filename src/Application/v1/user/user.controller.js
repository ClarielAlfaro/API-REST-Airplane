import UserModel from './user.model';

export const getAllUsers = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await UserModel.find().skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getUserById = async (req, res) => {
  const { idUser } = req.params;

  try {
    const data = await UserModel.findById(idUser);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo recuperar el registro',
    });
  }
};

export const createUser = async (req, res) => {
  const {
    name,
    lastname,
    pass,
    email,
  } = req.body;

  if (!name || !lastname || !pass || !email) {
    return res.status(400).json({
      message:
        'Faltan datos, la consulta debe contener todos los campos',
      code: 400,
    });
  }

  try {
    const data = await UserModel.create({
      name,
      lastname,
      pass,
      email
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const updateUser = async (req, res) => {
  const { body, params } = req;
  const { idUser } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Hacen faltan campos',
    });
  }

  try {
    const data = await UserModel.findOneAndUpdate(
      { _id: idUser },
      {
        name: body.name,
        lastname: body.lastname,
        pass: body.pass,
        email: body.email
      }
    );
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo actualizar el registro',
    });
  }
};

export const deleteUser = async (req, res) => {
  const { params } = req;
  const { idUser } = params;

  try {
    const data = await UserModel.findOneAndUpdate(
      { _id: idUser },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo eliminar el registro',
    });
  }
};
