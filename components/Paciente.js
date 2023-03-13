import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import moment from 'moment'

const Paciente = ({
    item,
    setModalVisible,
    pacienteEditar,
    pacienteEliminar,
    setModalPaciente,
    setPaciente
}) => {
    const { paciente, date, id } = item
    const dateText = moment(date).format('dddd DD MMMM YYYY')

    return (
        <Pressable
            onLongPress={() => {
                setModalPaciente(true)
                setPaciente(item)
            }}
        >
            <View style={styles.contenedor}>
                <Text style={styles.label}>Paciente:</Text>
                <Text style={styles.texto}>{paciente}</Text>
                <Text style={styles.fecha}>{dateText}</Text>

                <View style={styles.contenedorBotones}>
                    <Pressable
                        style={[styles.btn, styles.btnEditar]}
                        onPress={() => {
                            setModalVisible(true)
                            pacienteEditar(id)
                        }}
                    >
                        <Text style={styles.btnTexto}>Editar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.btn, styles.btnEliminar]}
                        onPress={() => pacienteEliminar(id)}
                    >
                        <Text style={styles.btnTexto}>Eliminar</Text>
                    </Pressable>
                </View>

            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#fff',
        padding: 15,
        borderBottomColor: '#94a3b8',
        borderBottomWidth: 1,
        marginBottom: 15
    },
    label: {
        color: '#374151',
        textTransform: 'uppercase',
        fontWeight: '700'
    },
    texto: {
        color: '#6d28d9',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,

    },
    fecha: {
        color: '#374151',
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,

    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    btnEditar: {
        backgroundColor: '#f59e0b'
    },
    btnEliminar: {
        backgroundColor: '#ef4444'
    },
    btnTexto: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12,
        color: '#fff',
    },
})

export default Paciente