# Laravel 5.3

## Description

Post and reply to comments, using jQuery and RESTful API with Laravel 5.3

Demo running at: http://pjb-comments.runwaypassport.com/comments/


## Build and Run.
1.  **Clone the repo** and cd into this directory

    ```sh
    $ git clone https://github.com/lacma2011/laravel5-comments.git
    $ cd laravel5-comments
```
2.  **Install dependencies** via [Composer](http://getcomposer.org/doc/00-intro.md).
    Run `php composer.phar install` (if composer is installed locally) or `composer install`
    (if composer is installed globally).

3.  Create a new database in mysql

4.  create .env file from a copy of .env-example, and modify database and connection settings to new database:
    ```sh
    
    cp .env.example .env
    emacs .env  [or your favorite editor]
```

5.  Modify mysql connection settings in config/database.php  (under connections->mysql)

6.  Run db migration & database script:

    ```sh
    php artisan migrate --seed
```

7.  Couple other scripts:
    ```sh
    php artisan key:generate
    php artisan cache:clear
```

8. run PHP web service with
    ```sh
    php artisan serve
```
