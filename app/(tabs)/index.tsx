import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // SEU IP ATUALIZADO
  const API_URL = 'http://192.168.0.18:3000/api/cripto/preco';

  const buscarDados = async () => {
    setCarregando(true);
    try {
      const resposta = await axios.get(API_URL, {
        headers: {
          'x-api-key': 'MarcioSeguranca2026@' // ENVIANDO O CRACHÁ
        }
      });
      setLista(resposta.data.dados);
    } catch (error) {
      console.error("Erro de Autenticação/Rede:", error.message);
    }
    setCarregando(false);
  };

  useEffect(() => { buscarDados(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mercado Cripto</Text>
      
      {carregando ? (
        <ActivityIndicator size="large" color="#f7931a" />
      ) : (
        <FlatList
          data={lista}
          keyExtractor={(item) => item.sigla}
          style={{ width: '100%' }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.moeda}>{item.moeda}</Text>
              <Text style={styles.preco}>$ {item.preco}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.botao} onPress={buscarDados}>
        <Text style={styles.textoBotao}>Atualizar Painel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', paddingTop: 60 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  card: {
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#f7931a'
  },
  moeda: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  preco: { color: '#f7931a', fontSize: 18, fontWeight: 'bold' },
  botao: { backgroundColor: '#f7931a', padding: 15, borderRadius: 8, marginVertical: 30, width: '90%', alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});