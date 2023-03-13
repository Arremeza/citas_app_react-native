import React from 'react'
import { Text, SafeAreaView, Pressable, View, StyleSheet, } from 'react-native'
import moment from 'moment'



const InformacionPaciente = ({ paciente, setModalPaciente, setPaciente }) => {
    const fechaN = moment(paciente.date).format('dddd DD MMMM YYYY')
  return (
    <SafeAreaView
        style={styles.contenedor}
    >
        <Text style={styles.titulo}>Informacion {''}
            <Text style={styles.tituloBold}>Paciente</Text>
        </Text>
        <View>
            <Pressable
                onPress={() => {
                    setModalPaciente(false)
                    setPaciente({})
                }}
                style={styles.btnCerrar}
            >
                <Text style={styles.btnCerrarTexto}>Cerrar</Text>
            </Pressable>
            
        </View>
        <View 
            style={styles.contenido}
        >
            <View style={styles.campo}>
                <Text style={styles.label}>Nombre</Text>
                <Text style={styles.valor}>{paciente.paciente}</Text>
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Propietario</Text>
                <Text style={styles.valor}>{paciente.propietario}</Text>
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.valor}>{paciente.email}</Text>
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Teléfono</Text>
                <Text style={styles.valor}>{paciente.telefono}</Text>
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Fecha</Text>
                <Text style={styles.valor}>{fechaN}</Text>
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Síntomas</Text>
                <Text style={styles.valor}>{paciente.sintomas}</Text>
            </View>
        </View>
        

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#f59e0b',
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
    btnCerrar: {
        marginVertical: 30,
        backgroundColor: '#e06900',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCerrarTexto: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    contenido:{
        backgroundColor: '#fff',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    campo: {
        marginBottom: 10,
    },
    label:{
        textTransform: 'uppercase',
        color: '#374151',
        fontWeight: '600',
        fontSize: 12,
    },
    valor:{
        fontWeight: '700',
        fontSize: 20,
        color: '#334155'
    },
})

export default InformacionPaciente