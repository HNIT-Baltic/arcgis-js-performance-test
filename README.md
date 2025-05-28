# ArcGIS Maps SDK for JavaScript Performance Testing Application

## Description

This project provides two different performance test scenarios:

1. **I3S Performance Test** ([index.html](index.html)) - Tests performance using [`IntegratedMeshLayer`](main.js) with Frankfurt buildings data
2. **3D Tiles Performance Test** ([3dtiles.html](3dtiles.html)) - Tests performance using [`IntegratedMesh3DTilesLayer`](tiles3d.js) with Google 3D Tiles

Both tests measure:

- Load time (ms)
- Frame rate (FPS) over 30 seconds
- Memory usage (MB)
- Automated camera rotation for consistent testing

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone or download the project
2. Install dependencies:

```bash
npm install
```

3. Create Environment .env file using sample([.env.sample](.env.sample)) with your API keys

## Running the Application

### Development Server

Start the development server:

```bash
npx vite
```

The application will be available at:

- **I3S Test**: `http://localhost:5713/arcgisjsapi/`
- **3D Tiles Test**: `http://localhost:5713/arcgisjsapi/3dtiles.html`

## Usage

1. Open either test page in your browser
2. The application will automatically:
   - Load the 3D scene
   - Start camera rotation
   - Begin performance measurements
3. Use the "Stop/Start Rotation" button to control camera movement
4. Performance results are logged to console and optionally sent to a results server

## Configuration

### Performance Test Server

The application attempts to send results to `http://192.168.1.121:3000/save-results`. You can modify this endpoint in [`utils.js`](utils.js) in the [`performanceTest`](utils.js) function.

### Test Parameters

- **FPS measurement duration**: 30 seconds (configurable in [`utils.js`](utils.js))
- **Camera rotation speed**: 0.25 degrees per frame (configurable in [`rotateView`](utils.js))
- **Test ID**: Can be passed via URL parameter `?testId=your-test-id`

## Files Structure

- [`index.html`](index.html) - I3S performance test page
- [`3dtiles.html`](3dtiles.html) - 3D Tiles performance test page
- [`main.js`](main.js) - I3S test implementation
- [`tiles3d.js`](tiles3d.js) - 3D Tiles test implementation
- [`utils.js`](utils.js) - Shared utilities for performance testing and UI
- [`vite.config.js`](vite.config.js) - Vite configuration with multi-page setup
