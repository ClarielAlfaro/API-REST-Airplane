import CompanyModel from './company.model';

export const getAllCompanies = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await CompanyModel.find().skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getCompanyById = async (req, res) => {
  const { idCompany } = req.params;

  try {
    const data = await CompanyModel.findById(idCompany);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo recuperar el registro',
    });
  }
};

export const createCompany = async (req, res) => {
  const {
    name,
    phone,
    address,
  } = req.body;

  if (!name || !phone || !address) {
    return res.status(400).json({
      message:
        'Faltan datos, la consulta debe contener model, company, problem y diagnostic',
      code: 400,
    });
  }

  try {
    const data = await CompanyModel.create({
      name,
      phone,
      address,
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

export const updateCompany = async (req, res) => {
  const { body, params } = req;
  const { idCompany } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Hacen faltan campos',
    });
  }

  try {
    const data = await CompanyModel.findOneAndUpdate(
      { _id: idCompany },
      {
        name: body.name,
        phone: body.phone,
        address: body.address
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

export const deleteCompany = async (req, res) => {
  const { params } = req;
  const { idCompany } = params;

  try {
    const data = await CompanyModel.findOneAndUpdate(
      { _id: idCompany },
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
