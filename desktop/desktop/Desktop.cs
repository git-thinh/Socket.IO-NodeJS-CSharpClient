using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace desktop
{
    class Desktop
    {
        // TODO: check all errors
        static void Main(string[] args)
        {
            Int32 counter = 0;
            while (true)
            {
                SendUDP("127.0.0.1", 41181, counter.ToString(), counter.ToString().Length);
                Thread.Sleep(50);
                counter++;
            }

        }

        public static void SendUDP(string hostNameOrAddress, int destinationPort, string data, int count)
        {

            IPAddress destination = Dns.GetHostAddresses(hostNameOrAddress)[0];
            IPEndPoint endPoint = new IPEndPoint(destination, destinationPort);
            byte[] buffer = Encoding.ASCII.GetBytes(data);
            Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
            for (int i = 0; i < count; i++)
            {
                socket.SendTo(buffer, endPoint);
            }
            socket.Close();
            System.Console.WriteLine("Sent: " + data);
        }
    }
}
