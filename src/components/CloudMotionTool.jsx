import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { API_BASE_URL, checkBackendHealth, apiRequest } from '../config/api';

const CloudMotionTool = () => {
  const [files, setFiles] = useState([]);
  const [inputImages, setInputImages] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [backendHealth, setBackendHealth] = useState(null);
  const [connectionError, setConnectionError] = useState(null);

  // Configuration states
  const [inputFrames, setInputFrames] = useState('4');
  const [outputFrames, setOutputFrames] = useState('1');
  const [selectedBands, setSelectedBands] = useState({
    vis: true,
    swir: false,
    tir1: false,
    tir2: false,
    wv: false,
  });
  const [selectedAccuracy, setSelectedAccuracy] = useState({
    mae: true,
    ssim: false,
    psnr: false,
  });
  const [downloadFormat, setDownloadFormat] = useState('images');

  const fileInputRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];

  // Check backend health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await checkBackendHealth();
        setBackendHealth(health);
        setConnectionError(null);
      } catch (error) {
        console.error('Backend health check failed:', error);
        
        // Handle specific error cases
        if (error.message.includes('503')) {
          setConnectionError('Server is temporarily unavailable. The ML models may not be loaded yet.');
        } else {
          setConnectionError(error.message);
        }
        setBackendHealth(null);
      }
    };

    checkHealth();
    
    // Check health every 30 seconds
    const healthInterval = setInterval(checkHealth, 30000);
    
    return () => clearInterval(healthInterval);
  }, []);

  // File handling
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 5) {
        alert('Maximum 5 files allowed. Please select only 5 files.');
        return;
      }
      setFiles(droppedFiles);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 5) {
      alert('Maximum 5 files allowed. Please select only 5 files.');
      // Reset the file input
      e.target.value = '';
      return;
    }
    setFiles(selectedFiles);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Configuration handlers
  const handleBandChange = (band) => {
    setSelectedBands((prev) => ({ ...prev, [band]: !prev[band] }));
  };

  const handleAccuracyChange = (metric) => {
    setSelectedAccuracy((prev) => ({ ...prev, [metric]: !prev[metric] }));
  };

  const handleUpload = async () => {
    if (!files.length) return;
    if (files.length > 5) {
      alert('Maximum 5 files allowed. Please select only 5 files.');
      return;
    }

    // Check backend health before upload
    if (connectionError || !backendHealth) {
      alert('Backend service is not available. Please try again later.');
      return;
    }

    setUploading(true);
    setConnectionError(null);
    
    try {
      const formData = new FormData();
      for (let file of files) {
        formData.append('files', file);
      }

      console.log('Uploading to:', `${API_BASE_URL}/upload`);
      
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, let browser set it with boundary
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setInputImages(data.input_images);
      setPrediction(data.prediction);
      
    } catch (err) {
      console.error('Error uploading:', err);
      setConnectionError(err.message);
      
      if (err.message.includes('ERR_NETWORK_IO_SUSPENDED') || 
          err.message.includes('fetch') || 
          err.name === 'TypeError') {
        alert('Network connection error. Please check your internet connection and try again.');
      } else {
        alert(`Upload failed: ${err.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!prediction) return;
    try {
      // Extract filename from the prediction path
      const filename = prediction.split('/').pop();
      
      // Use the dedicated download route
      const response = await fetch(`${API_BASE_URL}/download/${filename}`);
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'predicted_image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback to direct link method
      const filename = prediction.split('/').pop();
      const link = document.createElement('a');
      link.href = `${API_BASE_URL}/download/${filename}`;
      link.download = filename || 'predicted_image.jpg';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleViewImage = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pt-28">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <svg className="w-10 h-10 text-[#002147] mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h1 className="text-2xl font-bold text-[#002147]">{t.cloudMotionToolTitle}</h1>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border shadow-2xl p-6 md:p-10 max-w-full mx-auto space-y-10">
          {/* Number Box for Selected Files */}
          {files.length > 0 && (
            <div className={`p-6 ${files.length === 5 ? 'bg-gradient-to-r from-[#FF4500] to-[#FF7F50]' : 'bg-gradient-to-r from-[#002147] to-[#0057b7]'} text-white rounded-2xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300`}>
              <div className="text-center">
                <span className="text-5xl font-bold">{files.length}</span>
                <p className="text-lg font-semibold">{t.selectedFiles}</p>
                <p className="text-sm opacity-75">Max: 5 files</p>
              </div>
            </div>
          )}

          {/* Notes Section */}
          <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-md transition-all duration-300 max-w-6xl mx-auto">
            <div className="flex items-center mb-6 gap-3">
              <svg
                className="w-8 h-8 text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-xl md:text-2xl font-bold text-blue-900">
                {t.futureUpdatesRoadmap}
              </h3>
            </div>

            <ul className="space-y-4 text-gray-800 text-sm md:text-base leading-relaxed list-disc pl-6 text-left">
  <li>
    <strong>{t.inputFrames}:</strong> {t.currentlyOnly} <span className="text-blue-700 font-medium">5 {t.inputFrames.toLowerCase()}</span> {t.framesSupported} <span className="text-blue-700 font-medium">4</span> {t.and} <span className="text-blue-700 font-medium">6</span> {t.framesWillBeAdded}
  </li>
  <li>
    <strong>{t.outputFrames}:</strong> {t.atPresent} <span className="text-blue-700 font-medium">1 {t.outputFrames.toLowerCase().slice(0, -1)}</span> {t.frameAvailable} <span className="text-blue-700 font-medium">2</span> {t.framesWillBeIntroduced}
  </li>
  <li>
    <strong>{t.bands}:</strong> {t.currentlyOnlyBand} <span className="text-blue-700 font-medium">VIS (Visible)</span> {t.bandActive} <span className="text-blue-700 font-medium">SWIR</span>, <span className="text-blue-700 font-medium">TIR1</span>, <span className="text-blue-700 font-medium">TIR2</span>, {t.and} <span className="text-blue-700 font-medium">WV</span> {t.arePlanned}
  </li>
  <li>
    <strong>{t.accuracy}:</strong> {t.metricsWillBeAdded} <span className="text-blue-700 font-medium">SSIM</span> {t.and} <span className="text-blue-700 font-medium">PSNR</span> {t.willBeAddedAlongside} <span className="text-blue-700 font-medium">MAE</span>.
  </li>
  <li>
    <strong>{t.downloadLabel} {t.images}:</strong> {t.currentlyOnly} <span className="text-blue-700 font-medium">{t.images}</span> {t.formatAvailable} <span className="text-blue-700 font-medium">{t.video}</span> {t.and} <span className="text-blue-700 font-medium">{t.gif}</span> {t.formatsComingSoon}
  </li>
</ul>

          </div>


          {/* Configuration Section */}
          <div className="p-8 bg-[#ffffff] rounded-2xl border border-[#e6eaf0] shadow-sm">
            <div className="flex items-center mb-6 gap-3">
              <svg className="w-10 h-10 text-[#002147] mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-xl font-bold text-[#002147]">{t.configuration}</h3>
            </div>

            {/* Frame Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-base font-semibold text-[#002147] mb-2">{t.inputFrames}</label>
                <select
                  value={inputFrames}
                  onChange={(e) => setInputFrames(e.target.value)}
                  className="w-full p-3 border border-[#e6eaf0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-[#f8fafc]"
                >
                  <option value="4">4 (Will be updated)</option>
                  <option value="5">5</option>
                  <option value="6">6 (Will be updated)</option>
                </select>
              </div>
              <div>
                <label className="block text-base font-semibold text-[#002147] mb-2">{t.outputFrames}</label>
                <select
                  value={outputFrames}
                  onChange={(e) => setOutputFrames(e.target.value)}
                  className="w-full p-3 border border-[#e6eaf0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-[#f8fafc]"
                >
                  <option value="1">1</option>
                  <option value="2">2 (Will be updated)</option>
                </select>
              </div>
            </div>

            {/* Bands (Channels) */}
            <div className="mb-8">
              <label className="block text-base font-semibold text-[#002147] mb-3">{t.bands}</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-[#e6eaf0] hover:bg-blue-50 transition">
                  <input
                    type="checkbox"
                    checked={selectedBands.vis}
                    onChange={() => handleBandChange('vis')}
                    className="accent-[#002147] w-5 h-5"
                  />
                  <span className="font-medium">(VIS) Visible</span>
                </label>
                <label className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-[#e6eaf0] hover:bg-blue-50 transition">
                  <input
                    type="checkbox"
                    checked={selectedBands.swir}
                    onChange={() => handleBandChange('swir')}
                    className="accent-[#002147] w-5 h-5"
                  />
                  <span className="font-medium">SWIR (Short Wave Infrared)</span>
                </label>
                <label className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-[#e6eaf0] hover:bg-blue-50 transition">
                  <input
                    type="checkbox"
                    checked={selectedBands.tir1}
                    onChange={() => handleBandChange('tir1')}
                    className="accent-[#002147] w-5 h-5"
                  />
                  <span className="font-medium">TIR1 (Thermal Infrared 1)</span>
                </label>
                <label className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-[#e6eaf0] hover:bg-blue-50 transition">
                  <input
                    type="checkbox"
                    checked={selectedBands.tir2}
                    onChange={() => handleBandChange('tir2')}
                    className="accent-[#002147] w-5 h-5"
                  />
                  <span className="font-medium">TIR2 (Thermal Infrared 2)</span>
                </label>
                <label className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-[#e6eaf0] hover:bg-blue-50 transition">
                  <input
                    type="checkbox"
                    checked={selectedBands.wv}
                    onChange={() => handleBandChange('wv')}
                    className="accent-[#002147] w-5 h-5"
                  />
                  <span className="font-medium">(WV) Water Vapour</span>
                </label>
              </div>
            </div>

            {/* Accuracy Metrics */}
            <div className="mb-8">
              <label className="block text-base font-semibold text-[#002147] mb-3">{t.accuracy}</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-[#e6eaf0] hover:bg-blue-50 transition">
                  <input
                    type="checkbox"
                    checked={selectedAccuracy.mae}
                    onChange={() => handleAccuracyChange('mae')}
                    className="accent-[#002147] w-5 h-5"
                  />
                  <span className="font-medium">MAE</span>
                </label>
                <label className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-[#e6eaf0] hover:bg-blue-50 transition">
                  <input
                    type="checkbox"
                    checked={selectedAccuracy.ssim}
                    onChange={() => handleAccuracyChange('ssim')}
                    className="accent-[#002147] w-5 h-5"
                  />
                  <span className="font-medium">SSIM</span>
                </label>
                <label className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-[#e6eaf0] hover:bg-blue-50 transition">
                  <input
                    type="checkbox"
                    checked={selectedAccuracy.psnr}
                    onChange={() => handleAccuracyChange('psnr')}
                    className="accent-[#002147] w-5 h-5"
                  />
                  <span className="font-medium">PSNR</span>
                </label>
              </div>
            </div>

            {/* Download Options */}
            <div>
              <label className="block text-base font-semibold text-[#002147] mb-3">{t.downloadLabel}</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-[#e6eaf0] hover:bg-orange-50 transition">
                  <input
                    type="radio"
                    name="downloadFormat"
                    value="images"
                    checked={downloadFormat === 'images'}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="accent-[#FF4500] w-5 h-5"
                  />
                  <span className="font-medium">{t.images}</span>
                </label>
                <label className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-[#e6eaf0] hover:bg-orange-50 transition">
                  <input
                    type="radio"
                    name="downloadFormat"
                    value="video"
                    checked={downloadFormat === 'video'}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="accent-[#FF4500] w-5 h-5"
                  />
                  <span className="font-medium">{t.video}</span>
                </label>
                <label className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-[#e6eaf0] hover:bg-orange-50 transition">
                  <input
                    type="radio"
                    name="downloadFormat"
                    value="gif"
                    checked={downloadFormat === 'gif'}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="accent-[#FF4500] w-5 h-5"
                  />
                  <span className="font-medium">{t.gif}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Drag and Drop Area */}
          <div
  className="border-2 border-dashed border-[#002147] rounded-2xl p-10 text-center cursor-pointer bg-gradient-to-br from-white/70 to-[#f0f4f8] hover:from-[#edf2f7] hover:to-white backdrop-blur-md shadow-xl transition-all duration-300 ease-in-out"
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  onClick={handleClick}
  style={{ outline: 'none' }}
>
  <input
    type="file"
    multiple
    ref={fileInputRef}
    onChange={handleFileChange}
    className="hidden"
  />

  <div className="flex flex-col items-center justify-center space-y-3">
    <div className="p-4 bg-white rounded-full shadow-md border border-[#002147] hover:scale-105 transition-transform duration-200">
      <svg
        className="w-10 h-10 text-[#002147]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 12l-4-4m0 0l-4 4m4-4v12"
        />
      </svg>
    </div>
    <span className="text-[#002147] font-semibold text-lg">{t.clickOrDrag}</span>
    <p className="text-sm text-gray-600">Click or drag files here to upload</p>
    <p className="text-xs text-red-600 font-medium mt-1">Maximum 5 files allowed</p>
  </div>
</div>



          {/* Selected Files List */}
          {files.length > 0 && (
            <div className="mb-8">
              <h3 className="text-[#002147] font-semibold mb-2">{t.selectedFiles}:</h3>
              <ul className="text-gray-700 text-sm bg-[#f8fafc] rounded-lg p-4 border border-[#e6eaf0] shadow-sm">
                {files.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Upload Button & Progress */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <button
              onClick={handleUpload}
              disabled={uploading || !files.length}
              className={`bg-gradient-to-r from-[#002147] to-[#0057b7] text-white px-10 py-3 rounded-lg font-bold shadow-md transition-all duration-200 ${uploading || !files.length ? 'opacity-60 cursor-not-allowed' : 'hover:from-[#00152e] hover:to-[#003366]'}`}
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  {t.uploading}
                </span>
              ) : t.uploadPredict}
            </button>
          </div>

          {/* Input Images Preview */}
          {inputImages.length > 0 && (
            <div className="space-y-4 mb-10">
              <h3 className="text-xl font-bold text-[#002147]">{t.inputImages}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {inputImages.map((img, i) => (
                  <div key={i} className="aspect-square bg-[#f8fafc] rounded-xl border border-[#e6eaf0] shadow flex items-center justify-center">
                    <img
                      src={`${API_BASE_URL}/${img}`}
                      alt={`Input ${i}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prediction Preview & Download */}
          {prediction && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#002147]">{t.prediction}</h3>
              <div className="aspect-video w-full max-w-2xl mx-auto bg-[#f8fafc] rounded-xl border border-[#e6eaf0] shadow flex items-center justify-center">
                <img
                  src={`${API_BASE_URL}/${prediction}`}
                  alt="Prediction"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleViewImage}
                  className="bg-gradient-to-r from-[#002147] to-[#003366] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:from-[#001a2e] hover:to-[#002855] transition-all duration-200"
                >
                  {t.view || 'View'}
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-[#FF4500] to-[#FF7F50] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:from-[#d63b00] hover:to-[#ff944d] transition-all duration-200"
                >
                  {t.download}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-4">
              <h3 className="text-2xl font-bold text-[#002147] mb-4 text-center">
                {t.prediction || 'Predicted Image'}
              </h3>
              <div className="flex justify-center">
                <img
                  src={`${API_BASE_URL}/${prediction}`}
                  alt="Prediction"
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudMotionTool;