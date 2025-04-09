# VR Grocery Shopping Experience

This feature provides a virtual reality grocery shopping experience where users can practice shopping skills in a safe, controlled environment. Users can navigate through aisles, select products, and learn about different food categories.

## Features

- **Interactive Shopping**: Pick up items, examine them, and add them to your cart
- **Budget Practice**: Learn to manage a shopping budget and track spending
- **Product Recognition**: Identify different products and understand their categories
- **Realistic Environment**: Immersive grocery store with realistic textures and 3D models
- **Multiple Aisles**: Navigate between different grocery store sections (produce, bakery, dairy, etc.)

## How to Use

1. Navigate to the VR Grocery Landing page
2. Click "Start VR Experience" to enter the VR grocery store
3. Use the WASD keys to move around the store
4. Use the mouse to look around
5. Click on products to examine them and add them to your cart
6. Use the aisle navigation buttons to move between different sections
7. Click "Back to Landing" to return to the landing page

## Technical Details

### Components

- `VRGroceryLanding.tsx`: Landing page for the VR grocery shopping experience
- `VRGroceryShopping.tsx`: Main VR grocery shopping experience

### Assets

The VR grocery shopping experience requires the following assets:

- **Textures**: Floor, walls, ceiling, shelves, and product textures
- **3D Models**: Product 3D models in GLB format

See the `public/assets/README.md` file for more details on the required assets.

### Dependencies

- A-Frame: VR framework
- React: UI framework
- React Router: Navigation

## Development

### Setting Up Assets

1. Create the necessary directories:
   ```
   mkdir -p public/assets/textures public/assets/models
   ```

2. Add textures and 3D models to the respective directories
   - For testing, you can use the `download-placeholders.sh` script in the `public/assets` directory

### Adding New Products

To add new products to the VR grocery store:

1. Add the product texture to the `public/assets/textures` directory
2. Add the product 3D model to the `public/assets/models` directory
3. Update the `products` array in the `VRGroceryShopping.tsx` component

### Customizing the Environment

To customize the grocery store environment:

1. Replace the floor, wall, ceiling, and shelf textures in the `public/assets/textures` directory
2. Update the lighting and environment settings in the `VRGroceryShopping.tsx` component

## Troubleshooting

- **VR not working**: Make sure you have a VR headset connected and compatible with WebXR
- **Textures not loading**: Check that the texture files exist in the correct directory
- **3D models not loading**: Check that the 3D model files exist in the correct directory and are in GLB format
- **Performance issues**: Reduce the number of products or simplify the 3D models

## Future Enhancements

- Add more product categories and items
- Implement a checkout process
- Add sound effects for a more immersive experience
- Implement a shopping list feature
- Add product comparison functionality
- Implement a tutorial for new users 