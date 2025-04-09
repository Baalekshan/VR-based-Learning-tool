# VR Grocery API

This API serves as a bridge between the React frontend and the C# VR application for the VR Grocery Shopping experience.

## Prerequisites

- .NET SDK 8.0 or later
- Visual Studio 2022 or Visual Studio Code with C# extensions

## Getting Started

1. Install the .NET SDK from [https://dotnet.microsoft.com/download](https://dotnet.microsoft.com/download)

2. Clone the repository

3. Navigate to the VRGroceryAPI directory:
   ```
   cd project/src/backend/VRGroceryAPI
   ```

4. Restore dependencies:
   ```
   dotnet restore
   ```

5. Build the project:
   ```
   dotnet build
   ```

6. Run the API:
   ```
   dotnet run
   ```

The API will be available at `http://localhost:5000` and `https://localhost:5001`.

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get a specific product
- `GET /api/products/category/{category}` - Get products by category

### Cart

- `GET /api/cart/{userId}` - Get a user's cart
- `POST /api/cart` - Add an item to the cart
- `PUT /api/cart/{id}` - Update a cart item
- `DELETE /api/cart/{id}` - Remove an item from the cart

### VR Session

- `POST /api/vrsession/start` - Start a new VR session
- `POST /api/vrsession/{sessionId}/end` - End a VR session
- `GET /api/vrsession/{sessionId}` - Get a specific VR session
- `GET /api/vrsession/user/{userId}` - Get all VR sessions for a user

## Integration with Unity VR Application

To integrate this API with a Unity VR application:

1. Create a Unity project with VR capabilities using the XR Interaction Toolkit

2. Use Unity's WebRequest class to communicate with this API

3. Example code for making API requests from Unity:

```csharp
using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Text;

public class APIClient : MonoBehaviour
{
    private const string API_BASE_URL = "http://localhost:5000/api";
    
    public IEnumerator GetProducts(System.Action<string> callback)
    {
        using (UnityWebRequest request = UnityWebRequest.Get($"{API_BASE_URL}/products"))
        {
            yield return request.SendWebRequest();
            
            if (request.result == UnityWebRequest.Result.Success)
            {
                callback(request.downloadHandler.text);
            }
            else
            {
                Debug.LogError($"Error: {request.error}");
            }
        }
    }
    
    public IEnumerator AddToCart(int productId, int quantity, string userId, System.Action<string> callback)
    {
        var cartItem = new
        {
            productId = productId,
            quantity = quantity,
            userId = userId
        };
        
        string json = JsonUtility.ToJson(cartItem);
        byte[] bodyRaw = Encoding.UTF8.GetBytes(json);
        
        using (UnityWebRequest request = new UnityWebRequest($"{API_BASE_URL}/cart", "POST"))
        {
            request.uploadHandler = new UploadHandlerRaw(bodyRaw);
            request.downloadHandler = new DownloadHandlerBuffer();
            request.SetRequestHeader("Content-Type", "application/json");
            
            yield return request.SendWebRequest();
            
            if (request.result == UnityWebRequest.Result.Success)
            {
                callback(request.downloadHandler.text);
            }
            else
            {
                Debug.LogError($"Error: {request.error}");
            }
        }
    }
}
```

## Next Steps

1. Implement a database to store products, cart items, and VR sessions
2. Add authentication to secure the API
3. Implement WebSocket communication for real-time updates
4. Add more product categories and items
5. Implement a checkout process 