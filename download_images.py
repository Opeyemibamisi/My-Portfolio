#!/usr/bin/env python3
"""
Script to download images from Pixabay for portfolio
Uses Pixabay public domain images without requiring API key for preview links
"""

import os
import urllib.request
from pathlib import Path
from datetime import datetime

# Image categories with search terms and descriptions
IMAGE_REQUIREMENTS = {
    "blog": {
        "mern-stack": {
            "search": "backend database",
            "description": "Designing MERN Apps That Stay Fast"
        },
        "react-patterns": {
            "search": "react ui design",
            "description": "React Patterns for Premium Interfaces"
        },
        "react-native": {
            "search": "mobile app development",
            "description": "Shipping React Native Apps"
        },
        "python-automation": {
            "search": "python programming code",
            "description": "Python Automation for Developers"
        },
        "career-growth": {
            "search": "career growth developer",
            "description": "Career Systems for Software Developers"
        },
        "web-tools": {
            "search": "web development tools",
            "description": "Modern Web Development Tooling"
        }
    },
    "projects": {
        "car-dealership": {
            "search": "car marketplace inventory",
            "description": "Car Dealership Platform"
        },
        "ai-chatbot": {
            "search": "artificial intelligence chatbot",
            "description": "AI Chatbot Application"
        },
        "ecommerce": {
            "search": "ecommerce shopping online",
            "description": "E-commerce Platform"
        },
        "mobile-app": {
            "search": "mobile application technology",
            "description": "Mobile App"
        }
    }
}

PIXABAY_DIRECT_LINKS = {
    "blog/mern-stack.jpg": "https://images.pexels.com/photos/3862630/pexels-photo-3862630.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "blog/react-patterns.jpg": "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "blog/react-native.jpg": "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "blog/python-automation.jpg": "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "blog/career-growth.jpg": "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "blog/web-tools.jpg": "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "projects/car-dealership.jpg": "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "projects/ai-chatbot.jpg": "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "projects/ecommerce.jpg": "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "projects/mobile-app.jpg": "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1200",
}

def download_image(url, filepath):
    """Download image from URL to specified filepath"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        req = urllib.request.Request(url, headers=headers)
        
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        
        file_size = os.path.getsize(filepath) / 1024  # KB
        print(f"✓ Downloaded: {filepath} ({file_size:.1f} KB)")
        return True
    except Exception as e:
        print(f"✗ Failed to download {url}: {str(e)}")
        return False

def main():
    base_path = Path(__file__).parent / "src" / "assets" / "images"
    base_path.mkdir(parents=True, exist_ok=True)
    
    print("=" * 60)
    print("Pixabay Image Downloader for Portfolio")
    print("=" * 60)
    print(f"\nDownloading images to: {base_path}")
    print()
    
    successful = 0
    failed = 0
    
    for filepath, url in PIXABAY_DIRECT_LINKS.items():
        full_path = base_path / filepath
        if download_image(url, str(full_path)):
            successful += 1
        else:
            failed += 1
    
    print()
    print("=" * 60)
    print(f"Download Summary: {successful} successful, {failed} failed")
    print("=" * 60)
    
    # Create a manifest file
    manifest_path = base_path / "MANIFEST.md"
    with open(manifest_path, 'w') as f:
        f.write("# Portfolio Images Manifest\n\n")
        f.write(f"Downloaded: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("## Blog Post Images\n\n")
        for filename, info in IMAGE_REQUIREMENTS["blog"].items():
            f.write(f"- **{filename}.jpg**: {info['description']}\n")
            f.write(f"  Search term: {info['search']}\n\n")
        
        f.write("## Project Images\n\n")
        for filename, info in IMAGE_REQUIREMENTS["projects"].items():
            f.write(f"- **{filename}.jpg**: {info['description']}\n")
            f.write(f"  Search term: {info['search']}\n\n")
        
        f.write("## Image Credits\n\n")
        f.write("All images are from Pexels/Pixabay (CC0 Public Domain)\n")
        f.write("Free to use for personal and commercial projects.\n")

if __name__ == "__main__":
    main()
