FROM php:7.2-fpm

# Copy composer.lock and composer.json
#COPY ./app/composer.lock ./app/composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    mysql-client \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    nano \
    curl \
# Clear cache
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
# Install extensions
    && docker-php-ext-install pdo_mysql mbstring exif pcntl \
    && docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/ \
    && docker-php-ext-install gd \
# Install composer
#	&& curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
# Add user for laravel application	
	&& groupadd -g 1000 www \
	&& useradd -u 1000 -ms /bin/bash -g www www \
# Copy existing application directory permissions
	&& chown -R www:www /var/www

# Change current user to www
USER www


# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]