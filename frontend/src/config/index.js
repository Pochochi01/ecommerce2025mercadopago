

export const registerFormControls = [
    {
        name: 'userName',
        label: 'Usuario',
        placeholder: 'Ingrese su Nombre de Usuario',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Correo Electronico',
        placeholder: 'Ingrese su Email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Contraseña',
        placeholder: 'Ingrese su Contraseña',
        componentType: 'input',
        type: 'password',
    }
];

export const loginFormControls = [
    {
      name: "email",
      label: "Correo Electronico",
      placeholder: "Ingrese su Correo Electronico",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Contraseña",
      placeholder: "Ingrese su contraseña",
      componentType: "input",
      type: "password",
    },
  ];

  
  
  export const addProductFormElements = [
    {
      label: "Producto",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Ingrese el Nombre del Producto",
    },
    {
      label: "Descripcion",
      name: "description",
      componentType: "textarea",
      placeholder: "Descripcion del Producto",
    },
    {
      label: "Categoria",
      name: "category",
      componentType: "select",
      options: [
        { id: "categoria1", label: "Categoria1" },
        { id: "categoria2", label: "Categoria2" },
        { id: "categoria3", label: "Categoria3" },
        { id: "categoria4", label: "Categoria4" },
        { id: "categoria5", label: "Categoria5" },
        { id: "categoria6", label: "Categoria6" },
      ],
    },
    {
      label: "Marca",
      name: "brand",
      componentType: "select",
      options: [
        { id: "marca1", label: "Marca1" },
        { id: "marca2", label: "Marca2" },
        { id: "marca3", label: "Marca3" },
        { id: "marca4", label: "Marca4" },
        { id: "marca5", label: "Marca5" }, 
      ],
    },
    {
      label: "Precio",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Precio del Producto",
    },
    {
      label: "Precio de Venta",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Precio de Venta (opcional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Stock Total",
    },
  ];
  
  export const shoppingViewHeaderMenuItems = [
    {
      id: "inicio",
      label: "Inicio",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Nuestros Productos",
      path: "/shop/listing",
    },
    {
      id: "acercaDe",
      label: "Quienes Somos",
      path: "/shop/aboutUs",
    },
    {
      id: "contactanos",
      label: "Contactanos",
      path: "/shop/contact",
    },
    {
      id: "search",
      label: "Buscar",
      path: "/shop/search",
    },
  ];
  

  //Para que muestre la categoria y la marca debe coincidir categoryOptionsMap con el arreglo categoria igual el brandOptionsMap
  export const categoryOptionsMap = {
    categoria1: "Categoria1",
    categoria2: "Categoria2",
    categoria3: "Categoria3",
    categoria4: "Categoria4",
    categoria5: "Categoria5",
    categoria6: "Categoria6",
  };
  
  export const brandOptionsMap = {
    marca1: "Marca1",
    marca2: "Marca2",
    marca3: "Marca3",
    marca4: "Marca4",
    marca5: "Marca5",
  };
  
  export const filterOptions = {
    category: [
      { id: "categoria1", label: "Categoria1" },
      { id: "categoria2", label: "Categoria2" },
      { id: "categoria3", label: "Categoria3" },
      { id: "categoria4", label: "Categoria4" },
      { id: "categoria5", label: "Categoria5" },
      { id: "categoria6", label: "Categoria6" },
    ],
    brand: [
      { id: "marca1", label: "Marca1" },
      { id: "marca2", label: "Marca2" },
      { id: "marca3", label: "Marca3" },
      { id: "marca4", label: "Marca4" },
      { id: "marca5", label: "Marca5" },
    ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Precio: Menor a Mayor" },
    { id: "price-hightolow", label: "Precio: Mayor a Menor" },
    { id: "title-atoz", label: "De la A a la Z" },
    { id: "title-ztoa", label: "De la Z a la A" },
  ];
  
  export const addressFormControls = [
    {
      label: "Domicilio",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Domicilio",
    },
    {
      label: "Ciudad",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Ciudad",
    },
    {
      label: "Codigo Postal",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Codigo Postal",
    },
    {
      label: "Telefono",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Telefono",
    },
    {
      label: "Notas",
      name: "notes",
      componentType: "textarea",
      placeholder: "Notas Adicionales",
    },
  ];