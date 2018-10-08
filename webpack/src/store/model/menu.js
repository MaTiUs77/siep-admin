// Modelo Menu
const menu = {
 items: [
    {
      icon: 'home',
      title: 'Inicio',
      name: 'home'

    },
    {
      icon: 'account_circle',
      title: 'Inscripciones Nominales',
      name: 'rrhh_alumnos_nominal'
    },
    {
      icon:'school',
      title:'Instituciones',
      name:'instituciones'
    },

    {
      icon: 'account_circle',
      title: 'Secciones',
      name: 'matriculas_cuantitativa_por_seccion'
    },
    {
      icon: 'power_settings_new',
      title: 'Cerrar Sesion',
      name: 'login'
    }
  ]
};

const module = {
  state:menu
};

export default module
