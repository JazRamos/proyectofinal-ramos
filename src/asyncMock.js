const products = [
    {
        id: '1',
        name: 'Lapicera Bic Round Stic Azul x12u',
        price: 3945,
        category: 'lapiceras',
        img: 'https://res.cloudinary.com/diklj3m6q/image/upload/v1705344747/lapicera1_l3pehr.png',
        stock: 10,
        description: 'Caja por 12 unidades de lapiceras Bic línea Round Stic, color azul, trazo grueso.'
    },
    {
        id: '2',
        name: 'Lapiceras Bic Colores Cristal x10u',
        price: 7600,
        category: 'lapiceras',
        img: 'https://res.cloudinary.com/diklj3m6q/image/upload/v1705344747/lapicera2_k7isxg.png',
        stock: 10,
        description: 'Lapiceras Bic línea Cristal por 10 dolores surtidos, trazo grueso.'
    },
    {
        id: '3',
        name: 'Cuaderno Exito E7 Rayado',
        price: 5650,
        category: 'cuadernos',
        img: 'https://res.cloudinary.com/diklj3m6q/image/upload/v1705344747/cuaderno2_nbj6ye.png',
        stock: 10,
        description: 'Cuaderno Exito E7 espiralado tamaño A4. 60 hojas rayadas.'
    },
    {
        id: '4',
        name: 'Cuaderno Rivadavia ABC Rayado',
        price: 7950,
        category: 'cuadernos',
        img: 'https://res.cloudinary.com/diklj3m6q/image/upload/v1705344747/cuaderno1_vd59wz.png',
        stock: 10,
        description: 'Cuaderno Rivadavia ABC espiralado tamaño A4. 100 hojas rayadas.'
    },
    {
        id: '5',
        name: 'Resaltadores Ezco Neón x6u',
        price: 2320,
        category: 'resaltadores',
        img: 'https://res.cloudinary.com/diklj3m6q/image/upload/v1705344748/resaltador1_tzncqu.png',
        stock: 10,
        description: 'Pack resaltadores Ezco por 6 unidades, colores neón surtidos, punta biselada.'
    },
    {
        id: '6',
        name: 'Resaltadores Trabi Pastel x11u',
        price: 6350,
        category: 'resaltadores',
        img: 'https://res.cloudinary.com/diklj3m6q/image/upload/v1705344748/resaltador2_fszpyb.png',
        stock: 10,
        description: 'Pack resaltadores Trabi por 11 unidades, colores pastel surtidos, punta biselada.'
    },
    {
        id: '7',
        name: 'Lápiz Negro Grafito HB Ezco Mito x12u',
        price: 1500,
        category: 'lapices',
        img: 'https://res.cloudinary.com/diklj3m6q/image/upload/v1705344747/lapiz1_bdvzor.png',
        stock: 10,
        description: 'Caja por 12 unidades de lapices negro grafito Ezco línea Mito. Graduación HB.'
    },
    {
        id: '8',
        name: 'Lápices de colores Filgo Sigma Color x24u',
        price: 3025,
        category: 'lapices',
        img: 'https://res.cloudinary.com/diklj3m6q/image/upload/v1705344747/lapiz2_q7931q.png',
        stock: 10,
        description: 'Caja por 24 unidades de lapices de colores Filgo Sigma Color línea pinto. Lápices estándar.'
    },
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 1500);

    });
};

export const getProduct = (id) => {
    return new Promise((resolve, reject) => {
        const product = products.find(product => product.id === id);
        setTimeout(() => {
            if (!product) {
                reject("No se encontró el producto solicitado")
            } else {
                resolve(product);
            }
        }, 1500)
    });
};