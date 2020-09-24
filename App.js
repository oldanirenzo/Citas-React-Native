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
  ScrollView,
} from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {
  const [mostrarForm, setMostrarForm] = useState(false); //Mostrar el formulario ( Empieza en falso)
  const [mostrarTurnos, setMostrarTurnos] = useState(false); //Mostrar los turnos dados ( Empieza en falso)

  const [citas, setCitas] = useState([]);

  //Elimina los pacientes del state
  const eliminarCliente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };
  //Ocultar teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        cerrarTeclado();
      }}>
      <View style={styles.contenedor}>
        {mostrarForm || mostrarTurnos ? null : (
          // Si el formulario o turnos estan cerrados, muestra la imagen, sino, la esconde
          <Image
            style={styles.img}
            source={require('./assets/images/JirehSaludEstetica.jpeg')}
          />
        )}
        {/* Boton Mostrar Formulario */}
        {mostrarTurnos ? null : (
          <View>
            <TouchableHighlight
              onPress={() => setMostrarForm(!mostrarForm)}
              style={styles.btnMostrar}>
              <Text style={styles.textoMostrar}>
                {mostrarForm ? 'Cancelar Nuevo Turno' : 'Crear Nuevo Turno'}
              </Text>
            </TouchableHighlight>
          </View>
        )}

        {/* Boton Mostrar Turnos */}
        {mostrarForm ? null : (
          <View>
            <TouchableHighlight
              onPress={() => setMostrarTurnos(!mostrarTurnos)}
              style={styles.btnMostrar}>
              <Text style={styles.textoMostrar}>
                {mostrarTurnos ? 'Cerrar Turnos' : 'Mostrar Turnos'}
              </Text>
            </TouchableHighlight>
          </View>
        )}
        {/* Vistas del Formulario */}
        <View style={styles.contenido}>
          {mostrarForm ? (
            <ScrollView>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                setMostrarForm={setMostrarForm}
              />
            </ScrollView>
          ) : mostrarTurnos ? (
            <>
              <FlatList
                style={styles.listado, styles.margenes}
                data={citas}
                renderItem={({item}) => (
                  <Cita item={item} eliminarCliente={eliminarCliente} />
                )}
                keyExtractor={(cita) => cita.id}
              />
            </>
          ) : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  margenes: {
    marginBottom: 20,
    marginTop: Platform.OS === 'android' ? 20 : 40,
  },
  btnMostrar: {
    padding: 10,
    backgroundColor: '#0BA09C',
    marginTop: 10,
  },
  textoMostrar: {
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
