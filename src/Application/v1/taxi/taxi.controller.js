import  TaxiModel from './taxi.model';


export const getAllTaxies = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await TaxiModel.find().populate('user', ['name', 'lastname']).populate('mechanic', ['name', 'lastname']);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getTaxiById = async (req, res) => {
  const { idTaxi } = req.params;

  try {
    const data = await TaxiModel.findById(idTaxi).populate('user', ['name', 'lastname']).populate('mechanic', ['name', 'lastname']);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo recuperar el registro',
    });
  }
};

export const createTaxi = async (req, res) => {
  const {
    model,
    user,
    mechanic,
    problem,
    diagnostic
  } = req.body;

  if (!model || !user || !mechanic || !problem || !diagnostic) {
    return res.status(400).json({
      message:
        'Faltan datos, la consulta debe contener todo lo necesario',
      code: 400,
    });
  }

  try {
    const data = await TaxiModel.create({
    model,
    user,
    mechanic,
    problem,
    diagnostic
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

export const updateTaxi = async (req, res) => {
  const { body, params } = req;
  const { idTaxi } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Hacen faltan campos',
    });
  }

  try {
    const data = await TaxiModel.findOneAndUpdate(
      { _id: idTaxi },
      {
        model: body.model,
        user: body.user,
        mechanic: body.mechanic,
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

export const deleteTaxi = async (req, res) => {
  const { params } = req;
  const { idTaxi } = params;

  try {
    const data = await TaxiModel.findOneAndUpdate(
      { _id: idTaxi },
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
