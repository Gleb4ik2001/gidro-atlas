import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react';
import axios from 'axios';
import {regions} from '../data/sortbar_data.jsx';

const AddForm = ({setForm})=> {
 const [formData, setFormData] = useState({
    name: "",
    region: "",
    resource_type: "reservoir",
    water_type: "fresh",
    fauna: false,
    latitude: "",
    longitude: "",
    passport_date: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      const res = await axios.post(
        "http://127.0.0.1:8000/api/main/objects",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("Объект добавлен:", res.data);
      if (onSuccess) onSuccess(res.data);

      setFormData({
        name: "",
        region: "",
        resource_type: "reservoir",
        water_type: "fresh",
        fauna: false,
        latitude: "",
        longitude: "",
        passport_date: "",
        priority: 1,
        technical_condition: 1
      });
    } catch (err) {
      console.error(err);
      setError("Ошибка при добавлении объекта. Проверьте данные и токен.");
    }
  };
  return(
    <div className='absolute z-800 bg-blue-500/30 w-full h-screen top-0 flex items-center justify-center'>
      <form onSubmit={handleSubmit} className="p-4 flex flex-col relative gap-4 max-w-md border rounded shadow bg-white dark:bg-black">
      {error && <div className="text-red-500">{error}</div>}
        <button className='closeBtn absolute top-2 right-2' onClick={()=>setForm(false)}><CloseIcon/></button>
      <label className='mt-5'>
        Название:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="inputStyle w-full"
        />
      </label>

      <label>
        Регион:
        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
          className="p-2 rounded blue-color cursor-pointer w-full "
        >
          <option value="">Выберите регион</option>
          {regions.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </label>

      <label>
        Тип ресурса:
        <select
          name="resource_type"
          value={formData.resource_type}
          onChange={handleChange}
          className="p-2 rounded blue-color cursor-pointer w-full "
        >
          <option value="reservoir">Водохранилище</option>
          <option value="lake">Озеро</option>
          <option value="canal">Канал</option>
        </select>
      </label>

      <label>
        Тип воды:
        <select
          name="water_type"
          value={formData.water_type}
          onChange={handleChange}
          className="p-2 rounded blue-color cursor-pointer w-full "
        >
          <option value="fresh">Пресная</option>
          <option value="nonfresh">Непресная</option>
        </select>
      </label>

      <label>
        Широта:
        <input
          type="number"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          required
          className="p-2 rounded blue-color cursor-pointer w-full "
        />
      </label>

      <label>
        Долгота:
        <input
          type="number"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          required
          className="p-2 rounded blue-color cursor-pointer w-full "
        />
      </label>

      <label>
        Дата паспорта:
        <input
          type="date"
          name="passport_date"
          value={formData.passport_date}
          onChange={handleChange}
          className="p-2 rounded blue-color cursor-pointer w-full "
          required
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="fauna"
          checked={formData.fauna}
          onChange={handleChange}
        />
        Наличие фауны
      </label>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Добавить объект
      </button>
    </form>
  </div>
  )
}

export default AddForm;
