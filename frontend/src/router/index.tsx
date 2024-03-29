import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'
import { ClientDetail } from '../pages/clientDetail';
import { Clients } from '../pages/clients';
import { Home } from '../pages/home';
import { ProductDetail } from '../pages/productDetail';
import { Products } from '../pages/products';
import {Wrapper} from './styles';

export const Router = () => {
    return (
        <Wrapper>
            <header>
                <ul>
                    <li>
                        <Link to="/clients">
                            Clientes
                        </Link>
                    </li>
                    <li>
                        <Link to="/products">
                            Produtos
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                </ul>
            </header>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/clients/:id" component={ClientDetail} exact/>
                <Route path="/clients" component={Clients} />
                <Route path="/products/:id" component={ProductDetail} exact/>
                <Route path="/products/" component={Products} />
            </Switch>
        </Wrapper>
    )
}