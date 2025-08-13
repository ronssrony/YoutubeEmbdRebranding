<template>
  <div class="video-search-container">
    <!-- Search Header -->
    <div class="search-header">
      <div class="search-bar">
        <div class="search-input-container">
          <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              @input="onSearchInput"
              type="text"
              placeholder="Search videos..."
              class="search-input"
          />
          <button
              @click="handleSearch"
              class="search-button"
              :disabled="isLoading"
          >
            <svg v-if="!isLoading" class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.514 16.506M19 10.5A8.5 8.5 0 1 1 10.5 2A8.5 8.5 0 0 1 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div v-else class="loading-spinner"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-grid">
        <div v-for="n in 8" :key="n" class="skeleton-card">
          <div class="skeleton-thumbnail"></div>
          <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-channel"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div v-else-if="searchResults.length > 0" class="results-container">
      <div class="results-header">
        <h2 class="results-title">
          {{ searchQuery ? `Results for "${searchQuery}"` : 'Trending Music Videos' }}
        </h2>
        <span class="results-count">{{ searchResults.length }} videos</span>
      </div>

      <div class="video-grid">
        <div
            v-for="video in searchResults"
            :key="video.id.videoId"
            class="video-card"
        >
          <ReptilePlayer :source="`youtube/${video.id.videoId}`" :poster="video.snippet.thumbnails.medium.url" />
          <div class="video-info">
            <h3 class="video-title">{{ video.snippet.title }}</h3>
            <p class="video-channel">{{ video.snippet.channelTitle }}</p>
            <p class="video-published">{{ formatDate(video.snippet.publishedAt) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-else-if="hasSearched && !isLoading" class="no-results">
      <div class="no-results-content">
        <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L16.514 16.506M19 10.5A8.5 8.5 0 1 1 10.5 2A8.5 8.5 0 0 1 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3>No videos found</h3>
        <p>Try different keywords or check your spelling</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ReptilePlayer from '~/components/ReptilePlayer.vue';

// Reactive data
const searchQuery = ref('');
const searchResults = ref([]);
const selectedVideo = ref(null);
const isLoading = ref(false);
const hasSearched = ref(false);
const searchTimeout = ref(null);

// API configuration
const YOUTUBE_API_KEY = 'AIzaSyCDK-WrRWIfDiZxXD0s5l99MjBhkmeOZ_4';
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3/search';

// Search function
const searchVideos = async (query = 'trending music', maxResults = 12) => {
  try {
    isLoading.value = true;
    const params = new URLSearchParams({
      part: 'snippet',
      maxResults: maxResults.toString(),
      q: query,
      type: 'video',
      videoCategoryId: '10', // Music category
      key: YOUTUBE_API_KEY
    });

    const response = await fetch(`${YOUTUBE_API_BASE}?${params}`);
    const result = await response.json();

    if (result.error) {
      throw new Error(result.error.message);
    }

    searchResults.value = result.items || [];
    hasSearched.value = true;
  } catch (error) {
    console.error('Search failed:', error);
    searchResults.value = [];
    hasSearched.value = true;
  } finally {
    isLoading.value = false;
  }
};

// Handle search with debouncing
const handleSearch = () => {
  const query = searchQuery.value.trim();
  if (query) {
    searchVideos(query);
  } else {
    searchVideos(); // Default to trending
  }
};

// Handle input with debouncing
const onSearchInput = () => {
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    if (searchQuery.value.length > 2) {
      handleSearch();
    }
  }, 500);
};

// Select video for playing
const selectVideo = (video) => {
  selectedVideo.value = video;
  // Scroll to player
  setTimeout(() => {
    document.querySelector('.selected-video')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 100);
};

// Format date helper
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInHours < 24 * 7) {
    return `${Math.floor(diffInHours / 24)} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

// Initialize with trending videos
onMounted(() => {
  searchVideos();
});
</script>

<style scoped>
.video-search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Search Header */
.search-header {
  margin-bottom: 30px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 100;
  padding: 10px 0;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input-container {
  display: flex;
  max-width: 600px;
  width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 25px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.search-input-container:focus-within {
  border-color: #3b82f6;
}

.search-input {
  flex: 1;
  padding: 12px 20px;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
}

.search-button {
  padding: 12px 16px;
  border: none;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover:not(:disabled) {
  background: #2563eb;
}

.search-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.search-icon {
  width: 20px;
  height: 20px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Results Header */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e7eb;
}

.results-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.results-count {
  color: #6b7280;
  font-size: 14px;
}

/* Video Grid */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.video-card {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
  border: 1px solid #f3f4f6;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.video-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.7);
  border-radius: 50%;
  padding: 12px;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
}

.video-card:hover .play-overlay {
  opacity: 1;
}

.play-icon {
  width: 24px;
  height: 24px;
}

.video-info {
  padding: 16px;
}

.video-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 8px 0;
  color: #1f2937;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-channel {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 4px 0;
}

.video-published {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

/* Loading Skeleton */
.loading-container {
  margin-bottom: 40px;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.skeleton-card {
  border-radius: 12px;
  overflow: hidden;
  background: white;
  border: 1px solid #f3f4f6;
}

.skeleton-thumbnail {
  aspect-ratio: 16/9;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-content {
  padding: 16px;
}

.skeleton-title {
  height: 16px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 8px;
}

.skeleton-channel {
  height: 12px;
  width: 60%;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* No Results */
.no-results {
  text-align: center;
  padding: 60px 20px;
}

.no-results-content {
  max-width: 400px;
  margin: 0 auto;
}

.no-results-icon {
  width: 64px;
  height: 64px;
  color: #9ca3af;
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 24px;
  color: #374151;
  margin: 0 0 8px 0;
}

.no-results p {
  color: #6b7280;
  margin: 0;
}

/* Selected Video */
.selected-video {
  margin-bottom: 40px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.video-player-container {
  margin-bottom: 20px;
}

.selected-video-info {
  max-width: 800px;
}

.selected-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.selected-channel {
  color: #6b7280;
  font-size: 14px;
  margin: 0 0 12px 0;
}

.selected-description {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Static Video */
.static-video {
  margin-top: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e7eb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .video-search-container {
    padding: 15px;
  }

  .video-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .search-input-container {
    max-width: 100%;
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .results-title {
    font-size: 20px;
  }
}
</style>