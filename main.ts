const SHT31_DEFAULT_ADDR = 0x44 /**< SHT31 Default Address */
const SHT31_MEAS_HIGHREP_STRETCH = 0x2C06 /**< Measurement High Repeatability with Clock Stretch Enabled */
const SHT31_MEAS_MEDREP_STRETCH = 0x2C0D /**< Measurement Medium Repeatability with Clock Stretch Enabled */
const SHT31_MEAS_LOWREP_STRETCH = 0x2C10 /*< Measurement Low Repeatability with Clock Stretch Enabled*/
const SHT31_MEAS_HIGHREP = 0x2400 /**< Measurement High Repeatability with Clock Stretch Disabled */
const SHT31_MEAS_MEDREP = 0x240B /**< Measurement Medium Repeatability with Clock Stretch Disabled */
const SHT31_MEAS_LOWREP = 0x2416 /**< Measurement Low Repeatability with Clock Stretch Disabled */
const SHT31_READSTATUS = 0xF32D   /**< Read Out of Status Register */
const SHT31_SOFTRESET = 0x30A2    /**< Soft Reset */
const SHT31_HEATEREN = 0x306D     /**< Heater Enable */
const SHT31_HEATERDIS = 0x3066    /**< Heater Disable */
const SHT31_REG_HEATER_BIT = 0x0d /**< Status Register Heater Bit */
function Reset(){
    setReg(SHT31_SOFTRESET);
    basic.pause(10);
}

function setReg(command: number) {
    let buf = pins.createBuffer(2);
    //basic.pause(10)
    buf[0] = command >> 8
    buf[1] = command & 0xFF
    return pins.i2cWriteBuffer(SHT31_DEFAULT_ADDR, buf)
    }


namespace CIPSHT3X {
    Reset;
    setReg(SHT31_MEAS_HIGHREP);
    //let buf = pins.createBuffer(2);
    //pins.i2cWriteNumber(SHT31_DEFAULT_ADDR, SHT31_MEAS_HIGHREP, NumberFormat.UInt8BE, false);

    basic.pause(100);
    let i2cBuffer = pins.i2cReadBuffer(SHT31_DEFAULT_ADDR, pins.sizeOf(NumberFormat.UInt16LE) * 7, false);

    //pins.i2cWriteBuffer(SHT31_DEFAULT_ADDR, i2cBuffer, false);
    export function leer_temperatura(): number {
        let result = i2cBuffer[0] << 8;
        result |= i2cBuffer[1];
        result =((4375 * result) >> 14) - 4500;
        let temp = result / 100;
        return temp
    }
    //serial.writeBuffer(i2cBuffer);
    //serial.readBuffer(result);
    //basic.showNumber(temp);
    //basic.pause(1000)
    //CRC8(i2cBuffer[0], i2cBuffer[1], i2cBuffer[2]);
    //basic.showNumber(i2cBuffer[0]);
    export function leer_humedad(): number {
        let result_2 = i2cBuffer[3] << 8;
        result_2 |= i2cBuffer[4];
        result_2 = (625 * result_2) >> 12;
        let hum = result_2 / 100;
        return hum
    }
    
   // basic.pause(1000)
    //basic.showNumber(hum);
}


