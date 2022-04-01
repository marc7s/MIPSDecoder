const formats = {
    R: "R",
    I: "I",
    J: "J"
}

const instructions = [
    {
        name: "Add",
        mnemonic: "add",
        format: formats.R,
        opcode: 0x0,
        funct: 0x20
    },
    {
        name: "Add Immediate",
        mnemonic: "addi",
        format: formats.I,
        opcode: 0x8
    },
    {
        name: "Add Immediate Unsigned",
        mnemonic: "addiu",
        format: formats.I,
        opcode: 0x9
    },
    {
        name: "Add Unsigned",
        mnemonic: "addu",
        format: formats.R,
        opcode: 0x0,
        funct: 0x21
    },
    {
        name: "And",
        mnemonic: "and",
        format: formats.R,
        opcode: 0x0,
        funct: 0x24
    },
    {
        name: "And Immediate",
        mnemonic: "andi",
        format: formats.I,
        opcode: 0xC
    },
    {
        name: "Branch On Equal",
        mnemonic: "beq",
        format: formats.I,
        opcode: 0x4
    },
    {
        name: "Branch On Not Equal",
        mnemonic: "bne",
        format: formats.I,
        opcode: 0x5
    },
    {
        name: "Jump",
        mnemonic: "j",
        format: formats.J,
        opcode: 0x2
    },
    {
        name: "Jump And Link",
        mnemonic: "jal",
        format: formats.J,
        opcode: 0x3
    },
    {
        name: "Jump Register",
        mnemonic: "jr",
        format: formats.R,
        opcode: 0x0,
        funct: 0x8
    },
    {
        name: "Load Byte Unsigned",
        mnemonic: "lbu",
        format: formats.I,
        opcode: 0x24
    },
    {
        name: "Load Halfword Unsigned",
        mnemonic: "lhu",
        format: formats.I,
        opcode: 0x25
    },
    {
        name: "Load Linked",
        mnemonic: "ll",
        format: formats.I,
        opcode: 0x30
    },
    {
        name: "Load Upper Immediate",
        mnemonic: "lui",
        format: formats.I,
        opcode: 0xF
    },
    {
        name: "Load Word",
        mnemonic: "lw",
        format: formats.I,
        opcode: 0x23
    },
    {
        name: "Nor",
        mnemonic: "nor",
        format: formats.R,
        opcode: 0x0,
        funct: 0x27
    },
    {
        name: "Or",
        mnemonic: "or",
        format: formats.R,
        opcode: 0x0,
        funct: 0x25
    },
    {
        name: "Or Immediate",
        mnemonic: "ori",
        format: formats.I,
        opcode: 0xD
    },
    {
        name: "Set Less Than",
        mnemonic: "slt",
        format: formats.R,
        opcode: 0x0,
        funct: 0x2A
    },
    {
        name: "Set Less Than Immediate",
        mnemonic: "slti",
        format: formats.I,
        opcode: 0xA
    },
    {
        name: "Set Less Than Immediate Unsigned",
        mnemonic: "sltiu",
        format: formats.R,
        opcode: 0xB
    },
    {
        name: "Set Less Than Unsigned",
        mnemonic: "sltu",
        format: formats.R,
        opcode: 0x0,
        funct: 0x2B
    },
    {
        name: "Shift Left Logical",
        mnemonic: "sll",
        format: formats.R,
        opcode: 0x0,
        funct: 0x0
    },
    {
        name: "Shift Right Logical",
        mnemonic: "srl",
        format: formats.R,
        opcode: 0x0,
        funct: 0x02
    },
    {
        name: "Store Byte",
        mnemonic: "sb",
        format: formats.I,
        opcode: 0x28
    },
    {
        name: "Store Conditional",
        mnemonic: "sc",
        format: formats.I,
        opcode: 0x38
    },
    {
        name: "Store Halfword",
        mnemonic: "sh",
        format: formats.I,
        opcode: 0x29
    },
    {
        name: "Store Word",
        mnemonic: "sw",
        format: formats.I,
        opcode: 0x2B
    },
    {
        name: "Subtract",
        mnemonic: "sub",
        format: formats.R,
        opcode: 0x0,
        funct: 0x22
    },
    {
        name: "Subtract Unsigned",
        mnemonic: "subu",
        format: formats.R,
        opcode: 0x0,
        funct: 0x23
    }
];