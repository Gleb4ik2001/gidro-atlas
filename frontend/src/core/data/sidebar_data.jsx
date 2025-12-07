
export const filters_data = [
  { 
    name: 'regions', 
    label: 'Выберите область', 
    data: [ 
      { value:"akmola", label:"Акмолинская"},
      { value: "aktobe", label: "Актюбинская" },
      { value: "almaty_region", label: "Алматинская" },
      { value: "atyrau", label: "Атырауская" },
      { value: "east_kz", label: "Восточно-Казахстанская" },
      { value: "zhambyl", label: "Жамбылская" },
      { value: "west_kz", label: "Западно-Казахстанская" },
      { value: "karaganda", label: "Карагандинская" },
      { value: "kostanay", label: "Костанайская" },
      { value: "kyzylorda", label: "Кызылординская" },
      { value: "mangystau", label: "Мангистауская" },
      { value: "pavlodar", label: "Павлодарская" },
      { value: "north_kz", label: "Северо-Казахстанская" },
      { value: "turkestan", label: "Туркестанская" },
      { value: "ulytau", label: "Улытауская" },
      { value: "zhetysu", label: "Жетысуская" },
      { value: "astana", label: "г. Астана" },
      { value: "almaty", label: "г. Алматы" },
      { value: "shymkent", label: "г. Шымкент" }
    ]
  },
  { 
    name: 'resource_type', 
    label: 'Выберите тип водного ресурса', 
    data: [
      { value: "lake", label: "Озеро" },
      { value: "canal", label: "Канал" },
      { value: "reservoir", label: "Водохранилище" }
    ]
  },
  {
    name: 'water_type', 
    label: 'Выберите тип воды',
    data: [ 
      { value: "fresh", label: "Пресная" },
      { value: "nonfresh", label: "Непресная" }
    ]
  },
  { 
    name: 'fauna', 
    label: 'Выберите наличие фауны', 
    data: [
      {value: true, label:'да'}, 
      {value:false , label:'нет'}
    ] 
  },
  { 
    name: 'passport_date', 
    label: 'Выберите дату паспорта', 
    data: [
      {value:2025 , label:'2025'}, 
      {value:2024 , label:'2024'},
      {value:2023 , label:'2023'},
      {value:2022 , label:'2022'}
      ]
  },
  {
    name: 'category', 
    label: 'Выберите категорию состояния', 
    data: [
      {value: 1, label:'Категория 1'},
      {value:2 , label:'Категория 2'},
      {value:3 , label:'Категория 3'}, 
      {value:4 , label:'Категория 4'},
      {value:5 , label:'Категория 5'}] 
  },
];
