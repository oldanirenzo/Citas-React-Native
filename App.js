import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
} from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {
  const [mostrarForm, setMostrarForm] = useState(false);

  const [citas, setCitas] = useState([]);

  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };
  //Ocultar teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          cerrarTeclado();
        }}>
        <View style={styles.contenedor}>
          <Image
            style={styles.img}
            source={require('./assets/images/JirehSaludEstetica.jpeg')}
          />
          <View>
            <TouchableHighlight
              onPress={() => setMostrarForm(!mostrarForm)}
              style={styles.btnMostrarForm}>
              <Text style={styles.textoMostrarForm}>
                {mostrarForm ? 'Cancelar Nueva Cita' : 'Crear Nueva Cita'}
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.contenido}>
            {mostrarForm ? (
              <>
                <Text style={styles.titulo}>Crear Nueva Cita</Text>
                <Formulario
                  citas={citas}
                  setCitas={setCitas}
                  setMostrarForm={setMostrarForm}
                />
              </>
            ) : (
              <>
                <Text style={styles.titulo}></Text>
                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem={({item}) => (
                    <Cita item={item} eliminarPaciente={eliminarPaciente} />
                  )}
                  keyExtractor={(cita) => cita.id}
                />
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  contenedor: {
    backgroundColor: '#00C1CA',
    flex: 1,
  },
  titulo: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: Platform.OS === 'android' ? 20 : 40,
    textAlign: 'center',
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#0BA09C',
    marginTop: 10,
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: 220,
    marginVertical: 5,
  },
});

export default App;
