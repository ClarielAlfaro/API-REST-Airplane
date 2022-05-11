import PersonModel from './person.model';

export const getAllPeople = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await PersonModel.find().skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getPersonById = async (req, res) => {
  const { idPerson } = req.params;

  try {
    const data = await PersonModel.findById(idPerson);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo recuperar el registro',
    });
  }
};

export const createPerson = async (req, res) => {
  const {
    name,
    lastname,
    DUI,
  } = req.body;

  if (!name || !lastname || !DUI) {
    return res.status(400).json({
      message:
        'Faltan datos, la consulta debe contener name, lastname, y DUI',
      code: 400,
    });
  }

  try {
    const data = await PersonModel.create({
      name,
      lastname,
      DUI
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

export const updatePerson = async (req, res) => {
  const { body, params } = req;
  const { idPerson } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Hacen faltan campos',
    });
  }

  try {
    const data = await PersonModel.findOneAndUpdate(
      { _id: idPerson },
      {
        name: body.name,
        lastname: body.lastname,
        DUI: body.DUI
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

export const deletePerson = async (req, res) => {
  const { params } = req;
  const { idPerson } = params;

  try {
    const data = await PersonModel.findOneAndUpdate(
      { _id: idPerson },
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
