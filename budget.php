<html lang="en">
<?php
    session_start();
    if(!isset($_SESSION['id'])){
        header("Location: home.html");
    }
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="vendors/bootstrap.min.css">
    <link rel="stylesheet" href="css/budget.css">
    <title>Budgety</title>
</head>

<body>

    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <div class="container">
            <a href="home.html" class="navbar-brand" style="font-size: 4vh">Budget Manager</a>
            <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item mx-sm-3">
                        <a href="./php/logout.php" class="nav-link btn btn-outline-secondary text-white logout-btn">Log
                            out</a>
                    </li>

                    <li class="nav-item">
                        <a href="#" data-toggle="modal" data-target="#aboutModal" class="nav-link btn btn-outline-secondary  text-white about-btn">About</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <header id="home-section">
        <div class="dark-overlay">
            <div class="container">
                <div class="row pt-5">
                    <div class="col pt-5 ">
                        <div class="pt-2">
                            <h2 class="text-center mb-0"> Available Budget in
                                <span id="budget__title__month">Month</span>
                            </h2>
                            <h1 class="display-5 text-center" id="budget__value">0.00</h1>
                            <div class="row py-2 px-3 ml-3 mr-3 mx-sm-auto header-banner-green">
                                <div class="col text-left">INCOME</div>
                                <div class="col ml-2 text-left pl-sm-0" id="budget__income__value">0.00</div>
                                <div class="col-1"></div>
                            </div>
                            <div class="row py-2 px-3 mt-2 ml-3 mr-3 mx-sm-auto header-banner-red">
                                <div class="col text-left">EXPENSE</div>
                                <div class="col ml-4 text-left" id="budget__expenses__value">0.00</div>
                                <div class="col-2 px-0 text-center" style='background-color: rgba(255, 255, 255, 0.2)'>
                                    <span class="" id="budget__expenses__percentage"></span>%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>


    <section id="newsletter" class="text-center px-4 py-2 bg-dark text-white">
        <div class="container ">
            <h1>New Item</h1>
            <form action="budget.php" class="form-group row justify-content-center justify-content-sm-center mb-2">
                <div class="col-12 col-md-3 col-lg-2 mr-lg-2 form-group row">

                    <select class="col-md-9 col-lg-11 custom-select " id="add__type" title="Category">
                        <option value="">Category</option>
                        <option selected value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <div class="invalid-tooltip mt-0" style="position: absolute; ">
                        Please select Category.
                    </div>

                </div>


                <div class="col-12 col-md-5 col-lg-4 mr-md-2 form-group row ">
                    <input type="text" maxlength="49" class="form-control" id="add__description" placeholder="Add description"
                         required>
                    <div class="invalid-tooltip mt-0 ml-md-5" style="position: absolute;">
                        Please enter the description.
                    </div>
                </div>


                <div class="col-12 col-md-3 col-lg-2 mr-md-2 form-group row ">
                    <input type="number" class="form-control  form" id="add__value" placeholder="Amount" required>
                    <div class="invalid-tooltip mt-0" style="position: absolute;">
                        Please enter the amount.
                    </div>
                </div>


                <div class="col-12 col-md-2 col-lg-2 form-group row ">
                    <button type="submit" role="button" class="col-md-9 col-lg-8 col-xl-6 btn btn-outline-success btn-block  py-0 px-1 mx-sm-1 add_item"
                        id="add__btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="mt-1 logo">
                            <path class="check-back" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z">
                            </path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    </section>


    <section class="py-5 px-1 px-md-2" id="card_container">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="mx-0">
                        <div class="card text-white  mb-3 ">
                            <div class="card-header bg-success text-center h2">Income</div>
                            <div class="card-body bg-light item-card-container" id="card_income_container">
                                <!-- ___________________________ Rows ___________________________  -->

                                <!-- <div class="row mb-2" id="expense_55">
                                <div class="col card text-dark px-1 pt-lg-1 ">
                                    <div role="button" class="btn p-0 card-title m-0 text-right" style="height: 12px;">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-110 -80 675 675" class="btn-delete-size border-danger "  style="background-color: #fff1f2; height: 16px; width: 18px;">
                                                <path class="btn-delete-item" d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z">
                                            </path>
                                            </svg>
                                    </div>
                                    <div class="card-body form-row pr-2 pt-2 pb-2 pl-3 item-card ">
                                        <h4 class="col-8 h5 card-text pr-1 pb-1 pb-md-2 pb-lg-1 my-0 itme-description">Lorem ipsum dolor sit </h4>
                                        <p class="col-4 font-weight-bold text-right my-auto pr-1 itme-value" style="color:#28B9B5;">+888,810</p>
                                    </div>
                                </div>
                            </div> -->

                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-md-6 col-sm-12">
                    <div class="card text-white  mb-3">
                        <div class="card-header bg-danger text-center h2">Expense</div>
                        <div class="card-body bg-light item-card-container" id="card_expense_container">
                            <!-- ___________________________ Rows ___________________________  -->
                            <!-- <div class="row mb-2" id="expense_58">
                            <div class="col card text-dark p-0">
                                <div class="card-title my-0 text-right" style="height: 12px;">
                                    <button class="btn btn-sm  align-top" style="background-color: red; height: 18px; width: 18px;"></button>
                                </div>
                                <div class="card-body form-row pr-2 pt-2 pb-2 pl-3">
                                    <h4 class="col-7 h5 card-text pr-0 pb-0 mb-0 itme-description">Lorem ipsum dolor sit </h4>
                                    <p class="col-3 font-weight-bold text-right pr-0 my-auto itme-value">-111,180</p>
                                    <p class="col-2 mb-0 my-auto text-center" id="item__percentage">
                                        <mark class="item-percentage">21%</mark>
                                    </p>
                                </div>
                            </div>
                        </div> -->


                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <div class="modal fade" id="aboutModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content border-secondary">
                <div class="modal-header bg-secondary">
                    <h5 class="modal-title" id="exampleModalLabel">About</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>

                <div class="modal-body text-center">
                    <h2 style="color: #000;">Budget Manager</h2>
                    <div class="px-4">
                        <hr>
                    </div>
                    <p class="text-sm" style="color: #000;"> A simple a budget manager web application to calculate
                        income and expense. </p>
                    <p class="text-sm" style="color: #000;">It's an open source project developed for learing purpose.</p>
                </div>

                <div class="modal-footer justify-content-center">
                    <a href="https://www.github.com/Ravi879/BudgetManager" class="btn btn-primary" target="_blank">Looking
                        for source code &nbsp;&nbsp; <i class="fa fa-github"></i></a>
                </div>
            </div>
        </div>
    </div>


    <footer id="main-footer" class="bg-dark">
        <div class="footer-copyright text-center text-black-50 py-3">© 2018 Copyright:
            <a class="dark-grey-text" href="#"> BudgetManager.com</a>
        </div>
    </footer>


    <script src="vendors/jquery-slim.min.js"></script>
    <script src="vendors/popper.min.js"></script>
    <script src="vendors/bootstrap.min.js"></script>

    <script type="module" src="js/budget.js"></script>
</body>

</html>