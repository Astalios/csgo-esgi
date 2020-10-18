<!DOCTYPE html>
<html>
<head>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <main class="container-fluid">
        @include('flash::message')
        @yield('content')
    </main>
</body>
</html>

