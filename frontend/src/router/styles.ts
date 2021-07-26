import styled from 'styled-components';

export const Wrapper = styled.main`
    & > header {
        & > ul {
            list-style: none;
            
            & > li {
                background-color: black;
                float: right;
                margin-right: 32px;

                & > a {
                    text-decoration: none;
                    color: white;
                    font-weight: bold;
                    padding: 0 8px;

                    &:hover {
                        box-shadow: 5px 10px gray;
                    }
                }
            }
        }
    }
`;