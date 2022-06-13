import PlanModel from './plan.model';

export const getAllPlans = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await PlanModel.find().skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getPlanById = async (req, res) => {
  const { idPlan } = req.params;

  try {
    const data = await PlanModel.findById(idPlan);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo recuperar el registro',
    });
  }
};

export const createPlan = async (req, res) => {
  const {
    name,
    value
  } = req.body;
  if (!name || !value) {
    return res.status(400).json({
      message:
        'Faltan datos, la consulta debe contener todos los datos',
      code: 400,
    });
  }

  try {
    const data = await PlanModel.create({
      name,
      value
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

export const updatePlan = async (req, res) => {
  const { body, params } = req;
  const { idPlan } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Hacen faltan campos',
    });
  }

  try {
    const data = await PlanModel.findOneAndUpdate(
      { _id: idPlan },
      {
        name: body.name,
        value: body.value
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

export const deletePlan = async (req, res) => {
  const { params } = req;
  const { idPlan } = params;

  try {
    const data = await PlanModel.findOneAndUpdate(
      { _id: idPlan },
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
