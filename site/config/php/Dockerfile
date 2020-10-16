FROM php:7.4-fpm

ARG PHP_TIMEZONE

RUN apt-get update && apt-get install -y \
    openssl \
    curl \
    git \
    unzip \
    libzip-dev \
    zip \
    libxml2-dev \
    libmcrypt-dev \
    libpng-dev

# Configure PHP extensions
RUN docker-php-ext-configure zip

#RUN pecl install mcrypt-1.0.2
#RUN docker-php-ext-enable mcrypt

# Install PHP extensions
RUN docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    mysqli \
    zip \
    soap \
    bcmath \
    gd
    
# Set timezone
RUN ln -snf /usr/share/zoneinfo/${PHP_TIMEZONE} /etc/localtime && echo ${PHP_TIMEZONE} > /etc/timezone

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer
RUN mkdir /var/www/.composer && chown -R www-data:www-data /var/www/.composer

# Copy xdebug and php config.
COPY conf.d/* /usr/local/etc/php/conf.d/

# set default user and working directory
USER www-data
WORKDIR /var/www/html
