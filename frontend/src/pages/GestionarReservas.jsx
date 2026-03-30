// GestionarReservas.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarGestionSalas from '../components/NavbarGestionSalas';
import { useAuth } from "../context/AuthContext"; // 🔥 contexto usuario
import axios from "axios";

import '../styles/GestionarReservas.css'; 
import devolver from '../assets/images/devolver.png';

function GestionarReservas() {
  const { user } = useAuth(); // 🔥 usuario actual
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2)); // March 2026
  const [showCrear, setShowCrear] = useState(false);

  const [horaInicio, setHoraInicio] = useState("07:00 AM");
  const [horaFin, setHoraFin] = useState("07:30 AM");
  const [salas, setSalas] = useState([]);
  const [salaSeleccionada, setSalaSeleccionada] = useState("");

  const [reservasDelDia, setReservasDelDia] = useState([]);
  
  useEffect(() => {
    if (!selectedDate) return;

    const fetchReservasDelDia = async () => {
      try {
        const fechaStr = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const res = await axios.get(`http://localhost:3001/api/reservas?fecha=${fechaStr}`);
        setReservasDelDia(res.data);
      } catch (error) {
        console.error("Error al obtener reservas del día:", error);
        setReservasDelDia([]);
      }
    };

    fetchReservasDelDia();
  }, [selectedDate]);

  // 🔹 Obtener salas disponibles al montar
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/salas"); // ajusta la URL
        setSalas(res.data); // lista de salas
      } catch (error) {
        console.error("Error al obtener salas:", error);
      }
    };
    fetchSalas();
  }, []);

  // Obtener días del mes
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const getAvailabilityStatus = (date) => "disponible";
  const getStatusText = (status) => "Disponible";
  const getStatusColor = (status) => "#10b981";
  const getStatusBackgroundColor = (status) => "#d1fae5";

  // 🔹 Crear reserva
  const handleCrearReserva = async () => {
    if (!selectedDate) return alert("Debes seleccionar un día primero");
    if (!salaSeleccionada) return alert("Debes seleccionar una sala");
    if (!horaInicio || !horaFin) return alert("Debes seleccionar hora inicio y fin");

    try {
      // Construir fechas completas con hora
      const formatoHora = (hora) => {
        const [time, ampm] = hora.split(" ");
        let [h, m] = time.split(":").map(Number);
        if (ampm === "PM" && h !== 12) h += 12;
        if (ampm === "AM" && h === 12) h = 0;
        return { h, m };
      };

      const inicio = formatoHora(horaInicio);
      const fin = formatoHora(horaFin);

      const fechaInicio = new Date(selectedDate);
      fechaInicio.setHours(inicio.h, inicio.m, 0, 0);
      const fechaFin = new Date(selectedDate);
      fechaFin.setHours(fin.h, fin.m, 0, 0);

      // POST al backend
      await axios.post("http://localhost:3001/api/reservas", {
        fechaInicio,
        fechaFin,
        idUsuario: user.id, // 🔥 usuario del contexto
        idSala: salaSeleccionada
      });

      alert("Reserva creada correctamente");
      setShowCrear(false);
    } catch (error) {
      console.error("Error al crear reserva:", error);
      alert(error.response?.data?.errores?.join("\n") || "Error al crear reserva");
    }
  };

  return (
    <div className="grContainer">
      <NavbarGestionSalas userRole={user?.rol || ""} />
      
      <div className="grContent">
        <div className="threeColumnLayout">

          {/* Columna izquierda */}
          <div className="leftColumnSelected">
            <div className="selectedDateCard">
              <h3 className="selectedDateTitle">Fecha Seleccionada</h3>
              {selectedDate ? (
                <div className="selectedDateContent">
                  <div className="selectedDateDay">
                    <span className="dayNumberLarge">{selectedDate.getDate()}</span>
                  </div>
                  <div className="selectedDateDetails">
                    <p className="selectedDateFull">
                      {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <div 
                      className="selectedDateStatus"
                      style={{ 
                        backgroundColor: getStatusBackgroundColor(getAvailabilityStatus(selectedDate)),
                        color: getStatusColor(getAvailabilityStatus(selectedDate))
                      }}
                    >
                      {getStatusText(getAvailabilityStatus(selectedDate))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="noDateSelected">
                  <p>No hay fecha seleccionada</p>
                  <p className="hintText">Haz clic en un día del calendario</p>
                </div>
              )}
            </div>
              <div className="secondaryCard">
                <h4>Reservas del {selectedDate?.toLocaleDateString()}</h4>
                {reservasDelDia.length === 0 ? (
                  <p>No hay reservas para este día</p>
                ) : (
                  <ul className="reservasList">
                    {reservasDelDia.map((reserva) => (
                      <li key={reserva.id}>
                        Sala: <strong>{reserva.idSala}</strong> | 
                        {new Date(reserva.fechaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(reserva.fechaFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
          </div>

          {/* Columna central - Calendario */}
          <div className="centerColumn">
            <div className="calendarContainerSmall">
              <div className="calendarHeaderSmall">
                <button className="monthNavBtnSmall" onClick={handlePrevMonth}>←</button>
                <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                <button className="monthNavBtnSmall" onClick={handleNextMonth}>→</button>
              </div>
              
              <div className="calendarWeekDaysSmall">
                {dayNames.map(day => <div key={day} className="weekDaySmall">{day}</div>)}
              </div>
              
              <div className="calendarDaysSmall">
                {days.map((day, index) => {
                  const isSelected = selectedDate && isSameDate(day.date, selectedDate);
                  return (
                    <div 
                      key={index}
                      className={`calendarDaySmall ${!day.isCurrentMonth ? "otherMonthSmall" : ""} 
                        ${isSelected ? "selectedSmall" : ""} ${day.isCurrentMonth ? "clickableSmall" : ""}`}
                      onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
                    >
                      <span className="dayNumberSmall">{day.date.getDate()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="rightColumn">
            <div className="buttonsVertical">
              <button 
                className="reservaBtnVertical crearBtn"
                onClick={() => {
                  if (!selectedDate) return alert("Debes seleccionar un día antes de crear reserva");
                  setShowCrear(true);
                }}
              >
                Crear
              </button>
              <button className="reservaBtnVertical ajustarBtn">Ajustar</button>
              <button className="reservaBtnVertical cancelarBtn">Cancelar</button>
            </div>

            {/* Leyenda */}
            <div className="legendContainer">
              <h4 className="legendTitle">Estado</h4>
              <div className="legendItems">
                <div className="legendItem"><div className="legendColor disponible"></div><span>Disponible</span></div>
                <div className="legendItem"><div className="legendColor ocupado"></div><span>Ocupado</span></div>
                <div className="legendItem"><div className="legendColor inhabilitado"></div><span>Inhabilitado</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal Crear Reserva */}
      {showCrear && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h3>Crear Reserva</h3>

            <div className="modalField">

              <div className="fieldRow">
                <label>Hora Inicio:</label>
                <select value={horaInicio} onChange={e => setHoraInicio(e.target.value)}>
                  {Array.from({length: 28}, (_, i) => {
                    const h = 7 + Math.floor(i/2);
                    const m = i % 2 === 0 ? "00" : "30";
                    const ampm = h >= 12 ? "PM" : "AM";
                    const hora = ((h-1)%12+1) + ":" + m + " " + ampm;
                    return <option key={i}>{hora}</option>;
                  })}
                </select>
              </div>

              <div className="fieldRow">
                <label>Hora Fin:</label>
                <select value={horaFin} onChange={e => setHoraFin(e.target.value)}>
                  {Array.from({length: 28}, (_, i) => {
                    const h = 7 + Math.floor(i/2);
                    const m = i % 2 === 0 ? "00" : "30";
                    const ampm = h >= 12 ? "PM" : "AM";
                    const hora = ((h-1)%12+1) + ":" + m + " " + ampm;
                    return <option key={i}>{hora}</option>;
                  })}
                </select>
              </div>

              <div className="fieldRow">
                <label>Sala:</label>
                <select value={salaSeleccionada} onChange={e => setSalaSeleccionada(e.target.value)}>
                  <option value="">-- Selecciona sala --</option>
                  {salas.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                </select>
              </div>

            </div>

            <button className="modalPrimaryBtn" onClick={handleCrearReserva}>Crear</button>
            <button className="modalCloseBtn" onClick={() => setShowCrear(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="footergr">
        <Link to="/Secretaria"> 
          <img src={devolver} alt="devolver" className="devolvergr" />
        </Link>    
      </div>
    </div>
  );
}

export default GestionarReservas;