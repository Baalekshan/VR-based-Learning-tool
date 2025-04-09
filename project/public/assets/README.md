# VR Grocery Shopping Assets

This directory contains the assets needed for the VR Grocery Shopping experience.

## Directory Structure

- `textures/`: Contains texture images for the grocery store environment and products
- `models/`: Contains 3D models for the grocery products

## Required Assets

### Textures

The following textures are required for the grocery store environment:

- `floor.jpg`: Floor texture for the grocery store
- `wall.jpg`: Wall texture for the grocery store
- `ceiling.jpg`: Ceiling texture for the grocery store
- `shelf.jpg`: Shelf texture for the grocery store

The following textures are required for the products:

- `apple.jpg`: Apple texture
- `banana.jpg`: Banana texture
- `bread.jpg`: Bread texture
- `milk.jpg`: Milk texture
- `eggs.jpg`: Eggs texture
- `chicken.jpg`: Chicken texture
- `pasta.jpg`: Pasta texture
- `sauce.jpg`: Sauce texture

### 3D Models

The following 3D models are required for the products (in GLB format):

- `apple.glb`: Apple 3D model
- `banana.glb`: Banana 3D model
- `bread.glb`: Bread 3D model
- `milk.glb`: Milk 3D model
- `eggs.glb`: Eggs 3D model
- `chicken.glb`: Chicken 3D model
- `pasta.glb`: Pasta 3D model
- `sauce.glb`: Sauce 3D model

## How to Add New Assets

1. Add new texture images to the `textures/` directory
2. Add new 3D models to the `models/` directory
3. Update the `VRGroceryShopping.tsx` component to include the new assets

## Asset Sources

For realistic textures and 3D models, consider using:

- [Sketchfab](https://sketchfab.com/) - Free and paid 3D models
- [Poly Haven](https://polyhaven.com/) - Free textures and 3D models
- [TurboSquid](https://www.turbosquid.com/) - Paid 3D models and textures
- [CGTrader](https://www.cgtrader.com/) - Paid 3D models and textures

## Notes

- All textures should be in JPG or PNG format
- All 3D models should be in GLB format for optimal performance
- Texture sizes should be optimized for web use (recommended: 1024x1024 or 2048x2048)
- 3D models should be low-poly for optimal performance in VR 