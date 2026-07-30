import React from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function Details({ route }) {
  const { place } = route.params;
  const imageSource = typeof place.image === 'string' ? { uri: place.image } : place.image;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Imagem de Capa do Local */}
      <View style={styles.imageHeader}>
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{place.category}</Text>
        </View>
      </View>

      {/* Conteúdo Detalhado */}
      <View style={styles.content}>
        <Text style={styles.name}>{place.name}</Text>

        <View style={styles.locationRow}>
          <Text style={styles.locationPin}>📍</Text>
          <Text style={styles.neighborhood}>
            Bairro: {place.neighborhood}
          </Text>
        </View>

        {/* Grade de Cards Informativos (Incluindo os Novos Campos Exigidos) */}
        <Text style={styles.sectionHeaderTitle}>Informações Úteis</Text>

        <View style={styles.infoGrid}>
          {/* Endereço */}
          <View style={styles.informationBox}>
            <Text style={styles.informationTitle}>📍 Endereço</Text>
            <Text style={styles.informationText}>{place.address}</Text>
          </View>

          {/* Horário de Funcionamento */}
          <View style={styles.informationBox}>
            <Text style={styles.informationTitle}>🕒 Horário de Funcionamento</Text>
            <Text style={styles.informationText}>{place.openingHours}</Text>
          </View>

          {/* Entrada (Novo Campo Obrigatório) */}
          <View style={styles.informationBox}>
            <Text style={styles.informationTitle}>🎟️ Entrada</Text>
            <Text style={styles.informationText}>{place.admission}</Text>
          </View>

          {/* Acessibilidade (Novo Campo Obrigatório) */}
          <View style={styles.informationBox}>
            <Text style={styles.informationTitle}>♿ Acessibilidade</Text>
            <Text style={styles.informationText}>{place.accessibility}</Text>
          </View>

          {/* Contato (Novo Campo Obrigatório) */}
          {place.phone && (
            <View style={styles.informationBox}>
              <Text style={styles.informationTitle}>📞 Telefone / Contato</Text>
              <Text style={styles.informationText}>{place.phone}</Text>
            </View>
          )}

          {/* Estacionamento (Novo Campo Obrigatório) */}
          {place.parking && (
            <View style={styles.informationBox}>
              <Text style={styles.informationTitle}>🅿️ Estacionamento</Text>
              <Text style={styles.informationText}>{place.parking}</Text>
            </View>
          )}

          {/* Recomendação de Horário */}
          {place.bestTime && (
            <View style={styles.informationBox}>
              <Text style={styles.informationTitle}>☀️ Horário Recomendado</Text>
              <Text style={styles.informationText}>{place.bestTime}</Text>
            </View>
          )}
        </View>

        {/* Descrição Completa */}
        <Text style={styles.sectionTitle}>Sobre o local</Text>
        <Text style={styles.description}>{place.description}</Text>

        {/* Caixa de Observação Institucional */}
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>💡 Observação Importante</Text>
          <Text style={styles.warningText}>
            As informações apresentadas possuem finalidade educacional para o projeto.
            Horários de funcionamento, ingressos e condições de visitação devem ser confirmados
            junto aos órgãos oficiais do município antes de planejar sua visita.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },

  contentContainer: {
    paddingBottom: 40
  },

  imageHeader: {
    position: 'relative',
    width: '100%',
    height: 270,
    backgroundColor: '#cbd5e1'
  },

  image: {
    width: '100%',
    height: '100%'
  },

  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: '#0f392b',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },

  categoryText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700'
  },

  content: {
    padding: 20
  },

  name: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 6
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },

  locationPin: {
    fontSize: 15,
    marginRight: 6
  },

  neighborhood: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '600'
  },

  sectionHeaderTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12
  },

  infoGrid: {
    gap: 12,
    marginBottom: 24
  },

  informationBox: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4
  },

  informationTitle: {
    color: '#17533e',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4
  },

  informationText: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 22
  },

  sectionTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10
  },

  description: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'justify'
  },

  warningBox: {
    backgroundColor: '#fef3c7',
    borderColor: '#fde68a',
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 28,
    padding: 16
  },

  warningTitle: {
    color: '#92400e',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6
  },

  warningText: {
    color: '#78350f',
    fontSize: 14,
    lineHeight: 21
  }
});
