import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';

const Cita = ({item, eliminarCliente}) => {
  const dialogoEliminar = (id) => {
    console.log('Eliminando...');
    eliminarCliente(id);
    ToastAndroid.show('Eliminando...', ToastAndroid.SHORT);
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.cita}>
        <View>
          <Text style={styles.label}>Cliente</Text>
          <Text style={styles.texto}>{item.cliente}</Text>
        </View>
        <View>
          <Text style={styles.label}>Teléfono</Text>
          <Text style={styles.texto}>{item.telefono}</Text>
        </View>
        <View>
          <Text style={styles.label}>Tratamiento</Text>
          <Text style={styles.texto}>{item.tratamiento}</Text>
        </View>
        <View>
          <Text style={styles.label}>Fecha</Text>
          <Text style={styles.texto}>{item.fecha}</Text>
        </View>

        <View>
          <TouchableHighlight
            onPress={() => dialogoEliminar(item.id)}
            style={styles.btnEliminar}>
            <Text style={styles.textoEliminar}>Eliminar &times;</Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cita: {
    backgroundColor: '#FFF',
    borderBottomColor: '#e1e1e1',
    borderRightColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 5,
    borderRightWidth: 5,
    marginBottom: 20,
    paddingVertical: 10, //Si el padding es para arriba y abajo es el mismo, puedo usar paddingVertical
    paddingHorizontal: 20, //Tambien existe paddingHorizontal
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
