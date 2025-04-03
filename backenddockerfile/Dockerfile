# Use the official PHP image as a base
FROM php:8.1-fpm

# Install dependencies like extensions for MySQL and other required libraries
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set the working directory
WORKDIR /var/www

# Copy the Laravel app files into the container
COPY . .

# Install Laravel dependencies
RUN composer install --no-interaction --optimize-autoloader

# Expose the container’s port
EXPOSE 9000

# Start PHP-FPM server
CMD ["php-fpm"]
