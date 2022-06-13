import SubscriptionModel from './subscription.model';

export const getAllSubscriptions = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await SubscriptionModel.find().populate('user', ['name', 'lastname']).populate('plan', 'name');
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getSubscriptionById = async (req, res) => {
  const { idSubs } = req.params;

  try {
    const data = await SubscriptionModel.findById(idSubs).populate('user', ['name', 'lastname']).populate('plan', 'name');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo recuperar el registro',
    });
  }
};

export const createSubscription = async (req, res) => {
  const {
    user,
    plan
  } = req.body;

  if (!user || !plan) {
    return res.status(400).json({
      message:
        'Faltan datos, la consulta debe contener todos los datos',
      code: 400,
    });
  }

  try {
    const data = await SubscriptionModel.create({
      user,
      plan
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

export const updateSubscription = async (req, res) => {
  const { body, params } = req;
  const { idSubs } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Hacen faltan campos',
    });
  }

  try {
    const data = await SubscriptionModel.findOneAndUpdate(
      { _id: idSubs },
      {
        user: body.user,
        plan: body.plan
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

export const deleteSubscription = async (req, res) => {
  const { params } = req;
  const { idSubs } = params;

  try {
    const data = await SubscriptionModel.findOneAndUpdate(
      { _id: idSubs },
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
