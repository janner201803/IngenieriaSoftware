// GestionarReservas.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarGestionSalas from '../components/NavbarGestionSalas';
import '../styles/GestionarReservas.css'; 
import devolver from '../assets/images/devolver.png';

function GestionarReservas() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2)); // March 2026

  // Obtener días del mes
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Días del mes anterior para completar la primera semana
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Días del mes actual
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

  // Función para comparar fechas
  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  // Todos los días están disponibles
  const getAvailabilityStatus = (date) => {
    return "disponible";
  };

  const getStatusText = (status) => {
    return "Disponible";
  };

  const getStatusColor = (status) => {
    return "#10b981";
  };

  const getStatusBackgroundColor = (status) => {
    return "#d1fae5";
  };

  return (
    <div className="grContainer">
      <NavbarGestionSalas userRole="UOO" />
      
      <div className="grContent">
        {/* Layout de tres columnas */}
        <div className="threeColumnLayout">
          {/* Columna izquierda - Fecha seleccionada */}
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
          </div>

          {/* Columna central - Calendario pequeño */}
          <div className="centerColumn">
            <div className="calendarContainerSmall">
              <div className="calendarHeaderSmall">
                <button className="monthNavBtnSmall" onClick={handlePrevMonth}>←</button>
                <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                <button className="monthNavBtnSmall" onClick={handleNextMonth}>→</button>
              </div>
              
              <div className="calendarWeekDaysSmall">
                {dayNames.map(day => (
                  <div key={day} className="weekDaySmall">{day}</div>
                ))}
              </div>
              
              <div className="calendarDaysSmall">
                {days.map((day, index) => {
                  const isSelected = selectedDate && isSameDate(day.date, selectedDate);
                  
                  return (
                    <div 
                      key={index}
                      className={`calendarDaySmall ${!day.isCurrentMonth ? "otherMonthSmall" : ""} 
                        ${isSelected ? "selectedSmall" : ""}
                        ${day.isCurrentMonth ? "clickableSmall" : ""}`}
                      onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
                    >
                      <span className="dayNumberSmall">{day.date.getDate()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna derecha - Botones y leyenda */}
          <div className="rightColumn">
            <div className="buttonsVertical">
              <button className="reservaBtnVertical crearBtn">
                Crear
              </button>
              <button className="reservaBtnVertical ajustarBtn">
                Ajustar
              </button>
              <button className="reservaBtnVertical cancelarBtn">
                Cancelar
              </button>
            </div>

            {/* Leyenda de estados */}
            <div className="legendContainer">
              <h4 className="legendTitle">Estado</h4>
              <div className="legendItems">
                <div className="legendItem">
                  <div className="legendColor disponible"></div>
                  <span>Disponible</span>
                </div>
                <div className="legendItem">
                  <div className="legendColor ocupado"></div>
                  <span>Ocupado</span>
                </div>
                <div className="legendItem">
                  <div className="legendColor inhabilitado"></div>
                  <span>Inhabilitado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footergr">
        <Link to="/Secretaria"> 
          <img src={devolver} alt="devolver" className="devolvergr" />
        </Link>    
      </div>
    </div>
  );
}

export default GestionarReservas