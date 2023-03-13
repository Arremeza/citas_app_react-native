import React, { useState, useEffect } from 'react'
import { Modal, StatusBar, Text, SafeAreaView, StyleSheet, TextInput, BackHandler, View, ScrollView, Button, Platform, Pressable, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/es'
moment.locale('es')

const Formulario = ({
    cerrarModal,
    setPacientes,
    pacientes,
    paciente: pacienteObj,
    setPaciente: setPacienteApp, 
}) => {

    const [paciente, setPaciente] = useState('')
    const [id, setId] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [text, setText] = useState('Empty')

    useEffect(() => {
        if (Object.keys(pacienteObj).length > 0) {
            setPaciente(pacienteObj.paciente)
            setId(pacienteObj.id)
            setPropietario(pacienteObj.propietario)
            setEmail(pacienteObj.email)
            setTelefono(pacienteObj.telefono)
            setSintomas(pacienteObj.sintomas)
            setDate(pacienteObj.date)
        }
    }, [pacienteObj])

    const dateText = moment(date).format('LL')

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const handleCita = () => {
        if ([paciente, propietario, email, date, sintomas].includes('')) {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios',
            )
            return
        }

        const nuevoPaciente = {
            paciente,
            propietario,
            email,
            telefono,
            date,
            sintomas
        }

        if (id) {
            nuevoPaciente.id = id

            const pacientesActualizados = pacientes.map(pacienteState =>
                pacienteState.id === nuevoPaciente.id ? nuevoPaciente :
                pacienteState)
            setPacientes(pacientesActualizados)
            setPacienteApp({})
        } else {
            nuevoPaciente.id = Date.now()
            setPacientes([...pacientes, nuevoPaciente])
        }
        cerrarModal()
        setId('')
        setPaciente('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setDate(new Date())
        setSintomas('')

    }

    return (

        <Modal
                animationType='slide'

            >
                <StatusBar backgroundColor="#6d28d9" />


                <SafeAreaView style={styles.contenido}>
                    <ScrollView>
                        <Text
                            style={styles.titulo}
                        >{pacienteObj.id ? 'Editar' : 'Nueva'} {""}
                            <Text
                                style={styles.tituloBold}>Cita</Text>
                        </Text>

                        <Pressable
                            style={styles.btnCancelar}
                            onPress={() => {
                                cerrarModal()
                                setId('')
                                setPacienteApp({})
                                setPaciente('')
                                setPropietario('')
                                setEmail('')
                                setTelefono('')
                                setDate(new Date())
                                setSintomas('')
                            }}
                        >
                            <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                        </Pressable>


                        <View style={styles.campo}>
                            <Text style={styles.label}>Nombre Paciente</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Nombre paciente'
                                placeholderTextColor={'#666'}
                                value={paciente}
                                onChangeText={setPaciente}
                            />
                        </View>

                        <View style={styles.campo}>
                            <Text style={styles.label}>Nombre Propietario</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Nombre propietario'
                                placeholderTextColor={'#666'}
                                value={propietario}
                                onChangeText={setPropietario}
                            />
                        </View>

                        <View style={styles.campo}>
                            <Text style={styles.label}>Email Propietario</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Email propietario'
                                placeholderTextColor={'#666'}
                                keyboardType='email-address'
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.campo}>
                            <Text style={styles.label}>Teléfono Propietario</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Teléfono propietario'
                                placeholderTextColor={'#666'}
                                keyboardType='number-pad'
                                value={telefono}
                                onChangeText={setTelefono}
                                maxLength={10}
                            />
                        </View>

                        <View style={styles.campo}>
                            <Text style={styles.label}>Fecha</Text>
                            <Text style={styles.inputFecha} onPress={() => showMode('date')}>
                                {dateText}
                            </Text>
                            {/* <Button title="Elegir Fecha" style={styles.botonFecha} onPress={() => showMode('date')} /> */}
                            {show && (
                                < >
                                    <View style={styles.fechaContenedor}>
                                        <DateTimePicker
                                            minimumDate={new Date()}
                                            testID='DateTimePicker'
                                            value={date}
                                            mode={mode}
                                            is24Hours={true}
                                            display='spinner'
                                            onChange={onChange}
                                        />
                                    </View>
                                </>
                            )}
                        </View>

                        <View style={styles.campo}>
                            <Text style={styles.label}>Síntomas</Text>
                            <TextInput
                                style={[styles.input, styles.sintomasInput]}
                                placeholder='Síntomas paciente'
                                placeholderTextColor={'#666'}
                                value={sintomas}
                                multiline={true}
                                onChangeText={setSintomas}
                                textAlignVertical={'top'}
                            />
                        </View>

                        <Pressable
                            style={styles.btnNuevaCita}
                            onPress={handleCita}
                        >
                            <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Guardar Cambios' : 'Agregar Paciente'}</Text>
                        </Pressable>

                    </ScrollView>
                </SafeAreaView>
            </Modal>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contenido: {
        backgroundColor: '#6d28d9',
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 30,
        color: '#fff',
    },
    tituloBold: {
        fontWeight: '900',

    },
    btnCancelar: {
        marginVertical: 30,
        backgroundColor: '#5827a4',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCancelarTexto: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,
    },
    label: {
        color: '#fff',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600',

    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
    },
    inputFecha: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    sintomasInput: {
        height: 100,
        marginBottom: 10,
    },
    fechaContenedor: {
        backgroundColor: '#fff'
    },
    botonFecha: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    btnNuevaCita: {
        marginVertical: 50,
        backgroundColor: '#f59e0b',
        paddingVertical: 16,
        marginHorizontal: 32,
        borderRadius: 10,
    },
    btnNuevaCitaTexto: {
        textAlign: 'center',
        color: '#4A4646',
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 16,
    }
})

export default Formulario