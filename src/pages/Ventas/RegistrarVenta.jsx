import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Modal from 'react-modal';
import { MdSearch, MdDeleteForever } from "react-icons/md";
import useAuth from '../../components/useAuth';

import {
    LoginContainerStyled, LoginWrapper, LeftContainer, RightContainer,
    FormGroup, StyledButton, Title, Input, Select,
    TableContainer, SummaryContainer, ModalContainer, ModalContent, ModalButton, ClientInfo
} from './RegistrarVentaStyles';
import { FaDeleteLeft } from 'react-icons/fa6';

const RegistrarVenta = () => {
    const navigate = useNavigate();
    useAuth();
    const [form, setForm] = useState({
        vendedor: '',
        cliente: '',
        direccion: '',
        producto: '',
        cantidad: '',
        precio: ''
    });

    const [productos, setProductos] = useState([]);
    const [vendedores, setVendedores] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [subtotalState, setSubtotalState] = useState(0);

    const [searchProduct, setSearchProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1);
    const [confirmDeleteClientModal, setConfirmDeleteClientModal] = useState(false);
    useEffect(() => {
        document.title = 'VERTIMAR | Registrar Venta';
    });
    

    

    // Función separada para realizar la búsqueda
        const buscarCliente = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/ventas/filtrar-cliente?q=${searchTerm}`);
                setClientes(response.data);
                setModalIsOpen(true);
            } catch (error) {
                console.error('Error al buscar clientes:', error);
                toast.error('Error al buscar clientes');
            }
        };

    const handleSearchCliente = () => {
        if (selectedClient) {
            setConfirmDeleteClientModal(true); // Abre el modal de confirmación antes de eliminar
        } else {
            if (!searchTerm.trim()) {
                toast.error('Ingrese un nombre para buscar');
                return;
            }
            buscarCliente();
        }
    };

    // Función para eliminar cliente y productos asociados
    const handleConfirmDeleteClient = () => {
        setSelectedClient(null);
        setSearchTerm('');
        setForm({ ...form, cliente: '', direccion: '' });
        setProductos([]); // Limpiar productos seleccionados
        setSubtotalState(0);
        setConfirmDeleteClientModal(false);
    };

    const handleClientSelection = (client) => {
        setSelectedClient(client);
        setSearchTerm(client.nombre);
    };

    const handleConfirmClient = () => {
        if (selectedClient) {
            setForm({
                ...form,
                cliente: selectedClient.nombre,
                direccion: selectedClient.direccion
            });
            setModalIsOpen(false);
        }
    };


    const handleSearchProduct = async () => {
        if (!selectedClient) {
            toast.error('Debe seleccionar un cliente antes de buscar productos');
            return;
        }
        if (!searchProduct.trim()) {
            toast.error('Ingrese un producto para buscar');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3001/ventas/filtrar-producto?q=${searchProduct}`);
            setProducts(response.data);
            setProductModalOpen(true);
        } catch (error) {
            console.error('Error al buscar productos:', error);
            toast.error('Error al buscar productos');
        }
    };
    

    const handleProductSelection = (product) => {
        setSelectedProduct(product);
    };

    const handleAddProduct = () => {
        if (!selectedProduct || productQuantity < 1) {
            toast.error('Debe seleccionar un producto y una cantidad válida');
            return;
        }
    
        console.log("Producto seleccionado antes de agregar:", selectedProduct);
    
        const precio = parseFloat(selectedProduct.precio);
        const iva = parseFloat((precio * 0.21).toFixed(2));
        const subtotal = parseFloat((precio * productQuantity).toFixed(2));
    
        const newProduct = {
            id: selectedProduct.id,
            nombre: selectedProduct.nombre,
            unidad_medida: selectedProduct.unidad_medida,
            cantidad: productQuantity,
            precio,
            iva,
            subtotal
        };
    
        console.log("Nuevo producto agregado:", newProduct);
    
        setProductos([...productos, newProduct]);
        setSubtotalState(subtotalState + subtotal);
    
        setSelectedProduct(null);
        setProductQuantity(1);
        setProducts([]);
        setSearchProduct('');
        setProductModalOpen(false);
    };
    
    

    const handleRemoveProduct = (productId) => {
        const updatedProducts = productos.filter(prod => prod.id !== productId);
        setProductos(updatedProducts);
        // Recalcular subtotal después de eliminar el producto
        const newSubtotal = updatedProducts.reduce((acc, prod) => acc + parseFloat(prod.subtotal), 0);
        setSubtotalState(newSubtotal);
    };
    
    

    const calcularTotales = () => {
        let subtotal = productos.reduce((acc, prod) => acc + parseFloat(prod.subtotal), 0);
        let totalIVA = productos.reduce((acc, prod) => acc + parseFloat(prod.iva) * prod.cantidad, 0);
        let total = subtotal + totalIVA;
        return { subtotal, totalIVA, total };
    };

    const { subtotal, totalIVA, total } = calcularTotales();


    const handleRegistrarVenta = async () => {
        if (!selectedClient || productos.length === 0) {
            toast.error('Debe seleccionar un cliente y agregar al menos un producto.');
            return;
        }
    
        const ventaData = {
            cliente_id: selectedClient.id,
            cliente_nombre: selectedClient.nombre,
            cliente_telefono: selectedClient.telefono,
            cliente_direccion: selectedClient.direccion,
            cliente_ciudad: selectedClient.ciudad,
            cliente_provincia: selectedClient.provincia,
            cliente_condicion: selectedClient.condicion_iva,
            cliente_cuit: selectedClient.cuit,
            tipo_documento: 'Factura',
            tipo_fiscal: 'A',
            total: total.toFixed(2),
            estado: 'Registrada',
            empleado_id: 1,
            empleado_nombre: 'Fausto',
            productos: productos.map(p => ({
                id: p.id,
                nombre: p.nombre,
                unidad_medida: p.unidad_medida,
                cantidad: p.cantidad,
                precio: parseFloat(p.precio),
                iva: parseFloat(p.iva),
                subtotal: parseFloat(p.subtotal)
            })),
        };
    
        console.log("Datos de la venta antes de enviarse:", ventaData);
    
        try {
            const response = await axios.post('http://localhost:3001/ventas/crear-venta', ventaData);
            toast.success('Venta registrada con éxito');
            setProductos([]);
            setSubtotalState(0);
            setSelectedClient(null);
            setSearchTerm('');
        } catch (error) {
            console.error('Error al registrar la venta:', error);
            toast.error('Error al registrar la venta');
        }
    };
    
    
    


    return (
        <LoginContainerStyled>
            
            <LoginWrapper>
                
                <LeftContainer>
                    <Title style={{ color: 'white', textAlign: 'center' }}>Seleccionar</Title>

                    

                    <FormGroup>
                        <label style={{textAlign: 'center' }}>Cliente:</label>
                        <div style={{ textAlign: 'center' }}>
                            <Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar Cliente" disabled={!!selectedClient} />
                            <StyledButton type="button" onClick={handleSearchCliente} style={{ marginLeft: '10px' }}>
                                {selectedClient ? (
                                    <MdDeleteForever style={{ color: 'red' }} />
                                ) : (
                                    <MdSearch style={{ color: 'green' }} />
                                )}
                            </StyledButton>

                        </div>
                    </FormGroup>

                    <FormGroup>
                        <label style={{textAlign: 'center' }}>Buscar Producto:</label>
                        <div style={{ textAlign: 'center' }}>
                            <Input type="text" value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} placeholder="Buscar Producto" />
                            <StyledButton type="button" onClick={handleSearchProduct} style={{marginLeft: '10px'}}><MdSearch style={{color: 'green'}}/></StyledButton>
                        </div>
                    </FormGroup>
                </LeftContainer>

                {/* Contenedor derecho (Tabla de productos agregados) */}
                <RightContainer>
                {selectedClient && (
                        <ClientInfo>
                            <p><strong>Nombre:</strong> {selectedClient.nombre}</p>
                            <p><strong>Condición IVA:</strong> {selectedClient.condicion_iva}</p>
                            <p><strong>Dirección:</strong> {selectedClient.direccion}</p>
                            <p><strong>Ciudad:</strong> {selectedClient.ciudad}</p>
                        </ClientInfo>
                    )}

                    <TableContainer>
                        <DataTable value={productos} showGridlines tableStyle={{ minWidth: '50rem' }} emptyMessage="No hay productos agregados">
                        <Column field="id" header="Código"></Column>
                            <Column field="nombre" header="Nombre"></Column>
                            <Column field="unidad_medida" header="Unidad Medida"></Column>
                            <Column field="cantidad" header="Cantidad"></Column>
                            <Column field="precio" header="Precio Unitario ($)"></Column>
                            <Column field="iva" header="IVA ($)"></Column>
                            <Column field="subtotal" header="Subtotal ($)"></Column>
                            <Column 
                                header="" 
                                body={(rowData) => (
                                    <button 
                                        onClick={() => handleRemoveProduct(rowData.id)} 
                                        style={{
                                            backgroundColor: 'red', 
                                            color: 'white', 
                                            border: 'none', 
                                            padding: '5px', 
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ✖
                                    </button>
                                )}
                                style={{ textAlign: 'center', width: '5%' }}
                            />
                        </DataTable>
                        
                    </TableContainer>
                    <SummaryContainer>
                        <p>Subtotal: $ {subtotal.toFixed(2)}</p>
                        <p>IVA (21%): $ {totalIVA.toFixed(2)}</p>
                        <h4>Total: $ {total.toFixed(2)}</h4>
                    </SummaryContainer>

                    <StyledButton onClick={handleRegistrarVenta} style={{background: 'green', width: '20%'}}>CONFIRMAR VENTA</StyledButton>
                    
                    <StyledButton secondary onClick={() => navigate('/ventas')} style={{background: 'RED', marginTop: '10px', width: '20%'}}>CANCELAR</StyledButton>
                </RightContainer>
            </LoginWrapper>
            <Toaster />
            

            {/* MODAL CLIENTES */}
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <ModalContainer style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '50%', overflowY: 'auto', maxHeight: '400px' }}>
                    <h3>Seleccionar Cliente</h3>
                    {clientes.map((client, index) => (
                        <div key={index} onDoubleClick={() => handleClientSelection(client)} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
                            {client.nombre}
                        </div>
                    ))}
                </div>
                    
                    {selectedClient && (
                        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <ModalContent>
                                <ClientInfo><strong>Nombre:</strong> {selectedClient.nombre}</ClientInfo>
                                <ClientInfo><strong>Condición IVA:</strong> {selectedClient.condicion_iva}</ClientInfo>
                                <ClientInfo><strong>Dirección:</strong> {selectedClient.direccion}</ClientInfo>
                                <ClientInfo><strong>Ciudad:</strong> {selectedClient.ciudad}</ClientInfo>
                                <ModalButton onClick={handleConfirmClient}>Seleccionar Cliente</ModalButton>
                            </ModalContent>
                        </div>
                        
                    )}
                </ModalContainer>
            </Modal>

           {/* MODAL PRODUCTOS */}
            <Modal isOpen={productModalOpen} onRequestClose={() => setProductModalOpen(false)}>
                <ModalContainer style={{ display: 'flex', gap: '20px' }}>
                    
                    {/* Columna izquierda: Lista de productos */}
                    <div style={{ width: '50%', overflowY: 'auto', maxHeight: '400px' }}>
                        <h3>Seleccionar Producto</h3>
                        {products.map((product, index) => (
                            <div 
                                key={index} 
                                onDoubleClick={() => handleProductSelection(product)} 
                                style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
                                {product.nombre}
                            </div>
                        ))}
                    </div>

                    {/* Columna derecha: Detalles del producto seleccionado */}
                    {selectedProduct && (
                        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <ModalContent>
                                <h4>DATOS PRODUCTO</h4>
                                <ClientInfo><strong>Nombre:</strong> {selectedProduct.nombre}</ClientInfo>
                                <ClientInfo><strong>Unidad de Medida:</strong> {selectedProduct.unidad_medida}</ClientInfo>
                                <ClientInfo><strong>Precio:</strong> {selectedProduct.precio}</ClientInfo>
                                <ClientInfo><strong>Stock:</strong> {selectedProduct.stock_actual}</ClientInfo>

                                {/* Input numérico para la cantidad */}
                                <FormGroup>
                                    <label>Cantidad:</label>
                                    <Input 
                                        type="number" 
                                        value={productQuantity} 
                                        onChange={(e) => setProductQuantity(Math.max(1, Number(e.target.value)))} 
                                        min="1" 
                                        style={{ width: '100px' }} 
                                    />
                                </FormGroup>

                                <ClientInfo><strong>Subtotal:</strong> {(selectedProduct.precio * productQuantity).toFixed(2)}</ClientInfo>

                                {/* Botón de agregar producto */}
                                <ModalButton onClick={handleAddProduct}>Agregar Producto</ModalButton>
                            </ModalContent>
                        </div>
                    )}
                </ModalContainer>
            </Modal>

            {/* MODAL DE CONFIRMACIÓN AL ELIMINAR CLIENTE */}
            <Modal isOpen={confirmDeleteClientModal} onRequestClose={() => setConfirmDeleteClientModal(false)}>
                <ModalContainer>
                    <h3>¿Estás seguro de eliminar el cliente?</h3>
                    <p>Los artículos seleccionados se perderán.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                        <ModalButton onClick={handleConfirmDeleteClient}>Sí, eliminar</ModalButton>
                        <ModalButton onClick={() => setConfirmDeleteClientModal(false)} secondary>No, cancelar</ModalButton>
                    </div>
                </ModalContainer>
            </Modal>


        </LoginContainerStyled>
    );
};

export default RegistrarVenta;
