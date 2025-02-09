import os
import requests
from typing import Optional, Dict, Any

class ShopifyService:
    def __init__(self):
        self.base_url = f"https://{os.getenv('SHOPIFY_STORE_URL')}/admin/api/2023-07"
        self.headers = {
            "X-Shopify-Access-Token": os.getenv("SHOPIFY_ACCESS_TOKEN"),
            "Content-Type": "application/json"
        }

    def _make_request(self, method: str, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        url = f"{self.base_url}/{endpoint}"
        try:
            response = requests.request(
                method=method,
                url=url,
                headers=self.headers,
                json=data
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Shopify API Error: {str(e)}")
            raise

    def create_product(self, product_data: Dict) -> Dict:
        return self._make_request("POST", "products.json", {"product": product_data})

    def get_product(self, product_id: str) -> Dict:
        return self._make_request("GET", f"products/{product_id}.json")

    def delete_product(self, product_id: str) -> None:
        self._make_request("DELETE", f"products/{product_id}.json")

    def list_products(self) -> Dict:
        return self._make_request("GET", "products.json")
    
    def format_product_for_db(self, shopify_product: Dict) -> Dict:
        return {
        "shopify_id": str(shopify_product["id"]),
        "name": shopify_product["title"],
        "description": shopify_product.get("body_html", ""),
        "price": float(shopify_product["variants"][0]["price"]),
        "variants": [{
            "id": variant["id"],
            "option1": variant.get("option1"),
            "option2": variant.get("option2"),
            "price": variant["price"],
        } for variant in shopify_product["variants"]],
        "inventory": sum(int(variant["inventory_quantity"]) for variant in shopify_product["variants"]),
        "image_url": shopify_product["image"]["src"] if shopify_product.get("image") else None,
    }