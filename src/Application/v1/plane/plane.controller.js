import PlaneModel from './plane.model';


export const getAllPlanes = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await PlaneModel.find().populate('company', ['name', 'phone']).populate('person', ['name', 'lastname']);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getPlaneById = async (req, res) => {
  const { idPlane } = req.params;

  try {
    const data = await PlaneModel.findById(idPlane).populate('company', 'name').populate('person', ['name', 'lastname']);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo recuperar el registro',
    });
  }
};

export const createPlane = async (req, res) => {
  const {
    model,
    company,
    person,
    problem,
    diagnostic
  } = req.body;

  if (!model || !company || !person || !problem || !diagnostic) {
    return res.status(400).json({
      message:
        'Faltan datos, la consulta debe contener model, company, person, problem y diagnostic',
      code: 400,
    });
  }

  try {
    const data = await PlaneModel.create({
      model,
      company,
      person,
      problem,
      diagnostic,
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

export const updatePlane = async (req, res) => {
  const { body, params } = req;
  const { idPlane } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Hacen faltan campos',
    });
  }

  try {
    const data = await PlaneModel.findOneAndUpdate(
      { _id: idPlane },
      {
        model: body.model,
        company: body.company,
        person: body.person,
        problem: body.problem,
        diagnostic: body.diagnostic
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

export const deletePlane = async (req, res) => {
  const { params } = req;
  const { idPlane } = params;

  try {
    const data = await PlaneModel.findOneAndUpdate(
      { _id: idPlane },
      { status: 'repaired' }
    );

    return res.status(200).json({
      ...data,
      status: 'repaired',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo eliminar el registro',
    });
  }
};
