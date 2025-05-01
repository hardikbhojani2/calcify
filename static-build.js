import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Create a static version of the site
console.log('Creating a static version of the Calcify calculator website...');

// Create static directory if it doesn't exist
if (!fs.existsSync('./static-build')) {
  fs.mkdirSync('./static-build', { recursive: true });
}

// Copy the client HTML and css
try {
  // Copy index.html template
  fs.copyFileSync('./client/index.html', './static-build/index.html');
  
  // Copy css files - assuming they're directly in src or in a css directory
  if (fs.existsSync('./client/src/index.css')) {
    // Create directories if needed
    if (!fs.existsSync('./static-build/assets')) {
      fs.mkdirSync('./static-build/assets', { recursive: true });
    }
    fs.copyFileSync('./client/src/index.css', './static-build/assets/index.css');
  }
  
  // Create directory to copy JavaScript files
  if (!fs.existsSync('./static-build/assets/js')) {
    fs.mkdirSync('./static-build/assets/js', { recursive: true });
  }
  
  // Instead of trying to build the JS files, we'll create a simple static HTML page
  const staticHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calcify - Online Calculator Suite</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    .bg-primary {
      background-color: #4f46e5;
    }
    .text-primary {
      color: #4f46e5;
    }
    .border-primary {
      border-color: #4f46e5;
    }
    .hover\:bg-primary:hover {
      background-color: #4f46e5;
    }
    .hover\:text-primary:hover {
      color: #4f46e5;
    }
    .bg-secondary {
      background-color: #16a34a;
    }
    .text-secondary {
      color: #16a34a;
    }
    .bg-accent {
      background-color: #f59e0b;
    }
    .text-accent {
      color: #f59e0b;
    }
  </style>
</head>
<body class="min-h-screen flex flex-col">
  <!-- Navbar -->
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex-shrink-0 flex items-center">
          <a href="#" class="text-xl font-bold text-primary flex items-center">
            <i class="fas fa-calculator mr-2"></i>
            Calcify
          </a>
        </div>
        
        <div class="hidden sm:flex items-center space-x-8">
          <a href="#financial" class="text-gray-700 hover:text-primary">Financial</a>
          <a href="#fitness" class="text-gray-700 hover:text-primary">Fitness & Health</a>
          <a href="#math" class="text-gray-700 hover:text-primary">Math</a>
          <a href="#other" class="text-gray-700 hover:text-primary">Other</a>
        </div>
        
        <div class="flex items-center sm:hidden">
          <button type="button" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Open menu</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main content -->
  <main class="flex-grow">
    <!-- Hero section -->
    <section class="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            All-in-One Calculator Suite
          </h1>
          <p class="mt-4 text-xl max-w-3xl mx-auto">
            Fast, free, and accurate calculators for finance, fitness, math, and more
          </p>
          <div class="mt-8">
            <a href="#all-calculators" class="bg-white text-indigo-700 font-medium rounded-lg px-6 py-3 shadow-lg hover:bg-gray-100 transition-colors">
              View All Calculators
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Search section -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <div class="relative">
            <input type="text" class="w-full py-3 px-5 rounded-full shadow-md text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Search calculators..." disabled>
            <div class="absolute right-4 top-3 text-gray-400">
              <i class="fas fa-search"></i>
            </div>
          </div>
          <div class="mt-2 text-center text-gray-500 text-sm">
            Please note: This is a static preview version with limited functionality
          </div>
        </div>
      </div>
    </section>

    <!-- Categories section -->
    <section id="all-calculators" class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Financial calculators -->
        <div id="financial" class="mb-16">
          <h2 class="text-3xl font-bold flex items-center text-gray-900 mb-8">
            <i class="fas fa-dollar-sign mr-3 p-3 bg-blue-100 text-primary rounded-full"></i>
            Financial Calculators
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-home"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Mortgage Calculator</h3>
                <p class="text-gray-600 mb-4">Calculate mortgage payments and generate amortization schedules</p>
                <a href="#" class="text-primary font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-hand-holding-usd"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Loan Calculator</h3>
                <p class="text-gray-600 mb-4">Calculate loan payments, interest, and payoff schedules</p>
                <a href="#" class="text-primary font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-car"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Auto Loan Calculator</h3>
                <p class="text-gray-600 mb-4">Calculate auto loan payments and total interest costs</p>
                <a href="#" class="text-primary font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-chart-line"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Investment Calculator</h3>
                <p class="text-gray-600 mb-4">Calculate investment growth and returns over time</p>
                <a href="#" class="text-primary font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Fitness & Health calculators -->
        <div id="fitness" class="mb-16">
          <h2 class="text-3xl font-bold flex items-center text-gray-900 mb-8">
            <i class="fas fa-heartbeat mr-3 p-3 bg-green-100 text-secondary rounded-full"></i>
            Fitness & Health Calculators
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-green-100 text-secondary rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-weight"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">BMI Calculator</h3>
                <p class="text-gray-600 mb-4">Calculate your Body Mass Index and weight category</p>
                <a href="#" class="text-secondary font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-green-100 text-secondary rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-fire"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Calorie Calculator</h3>
                <p class="text-gray-600 mb-4">Calculate daily calorie needs based on lifestyle</p>
                <a href="#" class="text-secondary font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-green-100 text-secondary rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-percentage"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Body Fat Calculator</h3>
                <p class="text-gray-600 mb-4">Estimate your body fat percentage using different methods</p>
                <a href="#" class="text-secondary font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-green-100 text-secondary rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-baby"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Pregnancy Calculator</h3>
                <p class="text-gray-600 mb-4">Calculate due dates and pregnancy milestones</p>
                <a href="#" class="text-secondary font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Math calculators -->
        <div id="math" class="mb-16">
          <h2 class="text-3xl font-bold flex items-center text-gray-900 mb-8">
            <i class="fas fa-calculator mr-3 p-3 bg-yellow-100 text-accent rounded-full"></i>
            Math Calculators
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-yellow-100 text-accent rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-square-root-alt"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Scientific Calculator</h3>
                <p class="text-gray-600 mb-4">Perform advanced scientific calculations</p>
                <a href="#" class="text-accent font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-yellow-100 text-accent rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-divide"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Fraction Calculator</h3>
                <p class="text-gray-600 mb-4">Perform arithmetic operations with fractions</p>
                <a href="#" class="text-accent font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-yellow-100 text-accent rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-percentage"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Percentage Calculator</h3>
                <p class="text-gray-600 mb-4">Calculate percentages, increases, and decreases</p>
                <a href="#" class="text-accent font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-yellow-100 text-accent rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-shapes"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Triangle Calculator</h3>
                <p class="text-gray-600 mb-4">Calculate triangle dimensions and properties</p>
                <a href="#" class="text-accent font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Other calculators -->
        <div id="other" class="mb-16">
          <h2 class="text-3xl font-bold flex items-center text-gray-900 mb-8">
            <i class="fas fa-tools mr-3 p-3 bg-gray-200 text-gray-700 rounded-full"></i>
            Other Calculators
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-calendar-alt"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Age Calculator</h3>
                <p class="text-gray-600 mb-4">Calculate age based on birth date</p>
                <a href="#" class="text-gray-700 font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-calendar-day"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Date Calculator</h3>
                <p class="text-gray-600 mb-4">Calculate time between dates or add/subtract days</p>
                <a href="#" class="text-gray-700 font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-clock"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Time Calculator</h3>
                <p class="text-gray-600 mb-4">Add or subtract time intervals</p>
                <a href="#" class="text-gray-700 font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="w-12 h-12 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-key"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">Password Generator</h3>
                <p class="text-gray-600 mb-4">Generate secure, random passwords</p>
                <a href="#" class="text-gray-700 font-medium hover:underline">Open Calculator</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <a href="#" class="text-xl font-bold flex items-center">
            <i class="fas fa-calculator mr-2"></i>
            Calcify
          </a>
          <p class="mt-2 text-gray-300">All-in-one calculator suite for finance, fitness, math, and more. Fast, free, and accurate.</p>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Categories</h3>
          <ul class="mt-4 space-y-4">
            <li>
              <a href="#financial" class="text-base text-gray-300 hover:text-white">Financial</a>
            </li>
            <li>
              <a href="#fitness" class="text-base text-gray-300 hover:text-white">Fitness & Health</a>
            </li>
            <li>
              <a href="#math" class="text-base text-gray-300 hover:text-white">Math</a>
            </li>
            <li>
              <a href="#other" class="text-base text-gray-300 hover:text-white">Other</a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
          <ul class="mt-4 space-y-4">
            <li>
              <a href="#" class="text-base text-gray-300 hover:text-white">About</a>
            </li>
            <li>
              <a href="#" class="text-base text-gray-300 hover:text-white">Contact</a>
            </li>
            <li>
              <a href="#" class="text-base text-gray-300 hover:text-white">Sitemap</a>
            </li>
            <li>
              <a href="#" class="text-base text-gray-300 hover:text-white">Terms</a>
            </li>
            <li>
              <a href="#" class="text-base text-gray-300 hover:text-white">Privacy</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
        <p class="text-base text-gray-400">&copy; 2025 Calcify. All rights reserved.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-gray-300">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-300">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-300">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>`;
  
  // Write the static HTML file
  fs.writeFileSync('./static-build/index.html', staticHtml);
  
  console.log('Successfully created static version of the site!');
  console.log('The static files are in the ./static-build directory.');
  console.log('You can upload these files directly to your Hostinger hosting.');
} catch (error) {
  console.error('Error creating static version:', error);
}