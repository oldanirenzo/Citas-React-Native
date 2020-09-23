import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBox from '@react-native-community/checkbox';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, setMostrarForm}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [paciente, setPaciente] = useState('');
  const [responsable, setResponsable] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');

  // Control del CheckBox
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [fecha, setFecha] = useState(''); //Usado para guardar la fecha y hora

  //Mostrar u ocultar DatePicker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    console.log(moment(date).format('hh:mm A'));
    setFecha(
      moment(date).format('DD-MM-YYYY') + '\n' + moment(date).format('hh:mm A'),
    );
    hideDatePicker();
  };

  //Crear nueva Cita
  const crearNuevaCita = () => {
    //Validar que los campos no esten vacios
    if (
      paciente.trim() === '' ||
      responsable.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      sintomas.trim() === ''
    ) {
      // Algo esta vacio
      mostrarAlerta();
      return;
    }
    //Crear nueva cita
    const cita = {paciente, responsable, telefono, sintomas, fecha};

    cita.id = shortid.generate();
    //Agregar al state
    const citaNueva = [...citas, cita];
    setCitas(citaNueva);

    //Ocultar el formulario
    setMostrarForm(false);
  };

  //Muestra la alerta si falla la validacion de campos
  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //Titulo
      'Todos los campos son obligatorios', //Mensaje
      [
        {
          text: 'OK', //Arreglo de botones
        },
      ],
    );
  };
  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setPaciente(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}>Responsable:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setResponsable(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}>Telefono:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setTelefono(texto)}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha y Hora:</Text>
          <Button title="Seleccionar Fecha y Hora" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime" // datetime es un modo donde elegis la fecha, y luego la hora, todo junto
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            locale="es_ES"
          />
          <Text>{fecha}</Text>
        </View>

        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(texto) => setSintomas(texto)}
          />
        </View>
        <View>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
        </View>

        <View>
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Crear Cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginTop: 10,
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
