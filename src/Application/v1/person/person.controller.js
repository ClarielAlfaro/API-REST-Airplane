import PersonModel from './person.model';
// import PLaneModel from '../plane/plane.model';

export const getAllPeople = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await PersonModel.find().populate('plane', 'model').skip(offset).limit(limit);
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
    const data = await PersonModel.findById(idPerson).populate('plane', 'model');
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
    plane
  } = req.body;

  if (!name || !lastname || !DUI || !plane) {
    return res.status(400).json({
      message:
        'Faltan datos, la consulta debe contener name, lastname, DUI y plane',
      code: 400,
    });
  }

  try {
    const data = await PersonModel.create({
      name,
      lastname,
      DUI,
      plane,
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
      message:
        'Faltan datos, la consulta debe contener model, company, problem y diagnostic',
      code: 400,
    });
  }

  try {
    const person = await PersonModel.findOneAndUpdate({ id: idPerson }, body);
    return res.status(200).json(Object.assign(person, body));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
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
