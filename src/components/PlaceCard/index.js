import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function PlaceCard({ place, onPress, isFavorite, onToggleFavorite }) {
  const imageSource = typeof place.image === 'string' ? { uri: place.image } : place.image;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalhes de ${place.name}`}
    >
      {/* Imagem do local com Overlay de Categoria e Favorito */}
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Badge da Categoria */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{place.category}</Text>
        </View>

        {/* Botão de Favorito (Desafio Opcional) */}
        {onToggleFavorite && (
          <Pressable
            style={({ pressed }) => [
              styles.favoriteButton,
              pressed && styles.favoriteButtonPressed
            ]}
            onPress={(e) => {
              e.stopPropagation();
              onToggleFavorite(place.id);
            }}
            hitSlop={10}
            accessibilityLabel={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Text style={styles.favoriteIcon}>
              {isFavorite ? '★' : '☆'}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Conteúdo do Cartão */}
      <View style={styles.content}>
        <Text style={styles.name}>{place.name}</Text>

        <View style={styles.locationRow}>
          <Text style={styles.locationPin}>📍</Text>
          <Text style={styles.neighborhoodText}>
            {place.neighborhood}
          </Text>
        </View>

        <Text style={styles.summary} numberOfLines={3}>
          {place.summary}
        </Text>

        {/* Chips com Informações Rápidas (Novos campos) */}
        <View style={styles.quickTagsContainer}>
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>🎟️ {place.admission}</Text>
          </View>
          {place.parking && (
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>🅿️ {place.parking.split(' ')[0]}</Text>
            </View>
          )}
        </View>

        {/* Rodapé do Cartão */}
        <View style={styles.cardFooter}>
          <Text style={styles.detailsActionText}>
            Ver detalhes completos →
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    // Sombras profissionais iOS / Android
    elevation: 4,
    shadowColor: '#0f172a',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.08,
    shadowRadius: 10
  },

  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }]
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 195,
    backgroundColor: '#cbd5e1'
  },

  image: {
    width: '100%',
    height: '100%'
  },

  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#0f392b',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },

  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3
  },

  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },

  favoriteButtonPressed: {
    backgroundColor: '#ffffff',
    transform: [{ scale: 1.15 }]
  },

  favoriteIcon: {
    fontSize: 20,
    color: '#d97706',
    marginTop: -2
  },

  content: {
    padding: 16
  },

  name: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
    lineHeight: 26
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  locationPin: {
    fontSize: 13,
    marginRight: 4
  },

  neighborhoodText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600'
  },

  summary: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12
  },

  quickTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12
  },

  tagPill: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },

  tagText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '500'
  },

  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10,
    marginTop: 4
  },

  detailsActionText: {
    color: '#17533e',
    fontSize: 14,
    fontWeight: '700'
  }
});
