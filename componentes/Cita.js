import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';

const Cita = ({item, eliminarPaciente}) => {
  const dialogoEliminar = (id) => {
    console.log('Eliminando...');
    eliminarPaciente(id);
    ToastAndroid.show('Eliminando...', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente</Text>
        <Text style={styles.texto}>{item.paciente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Responsable</Text>
        <Text style={styles.texto}>{item.responsable}</Text>
      </View>
      <View>
        <Text style={styles.label}>Telefono</Text>
        <Text style={styles.texto}>{item.telefono}</Text>
      </View>
      <View>
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.texto}>{item.fecha}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintoma</Text>
        <Text style={styles.texto}>{item.sintomas}</Text>
      </View>

      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(item.id)}
          style={styles.btnEliminar}>
          <Text style={styles.textoEliminar}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cita: {
    backgroundColor: '#FFF',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20, //Si el padding es para arriba y abajo es el mismo, puedo usar paddingVertical
    paddingHorizontal: 10, //Tambien existe paddingHorizontal
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  texto: {
    fontSize: 18,
  },
  btnEliminar: {
    padding: 10,
    backgroundColor: 'red',
    marginTop: 10,
  },
  textoEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cita;
