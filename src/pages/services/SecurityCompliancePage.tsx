import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  FileCheck, 
  Eye, 
  ArrowRight, 
  CheckCircle,
  AlertTriangle,
  Database,
  UserCheck
} from 'lucide-react';

export const SecurityCompliancePage: React.FC = () => {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Robust Risk Mitigation",
      description: "Prevent identity theft, financial harm, and data breaches while avoiding substantial penalties from non-compliance"
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Enhanced Customer Trust", 
      description: "Demonstrate commitment to data protection, fostering loyalty and transparency that builds lasting relationships"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Operational Efficiency",
      description: "Automate complex compliance tasks, reducing manual effort by 85% while minimizing human error risks"
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Comprehensive Compliance",
      description: "Ensure adherence to GDPR, CCPA, HIPAA, and TCPA regulations across all communication channels automatically"
    }
  ];

  const features = [
    "Automatic PII/PHI redaction across all data types and formats",
    "Real-time TCPA consent tracking and automated renewal reminders", 
    "GDPR and CCPA compliance monitoring with automated data mapping",
    "Comprehensive audit trails with tamper-proof logging systems",
    "Role-based access controls with multi-factor authentication",
    "Automated regulatory change monitoring and compliance updates"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-xl w-fit mx-auto mb-6">
              <Shield className="h-12 w-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Security & Compliance
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Operate with unwavering confidence through automatic data redaction (PII/PHI), rigorous regulatory checks 
              (TCPA, GDPR), comprehensive audit trails, and secure access controls that protect your business and customers.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Secure Your Operations
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Definition */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Building Trust in a Regulated Digital World</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              In today's increasingly regulated digital environment, non-compliance carries severe consequences, including 
              hefty fines, significant legal repercussions, and irreversible damage to brand reputation. The protection of 
              sensitive information, particularly Personally Identifiable Information (PII) and Protected Health Information (PHI), 
              is not merely a best practice but a paramount necessity for business survival and customer trust.
            </p>
            <p className="mb-6">
              Adam Silva Consulting's AI-powered security and compliance platform automatically detects and removes or obscures 
              confidential information from vast volumes of diverse data types, including videos, audio recordings, images, and 
              documents. This comprehensive approach ensures strict compliance with global data protection standards such as 
              GDPR, CCPA, and HIPAA, thereby minimizing critical risks of data leaks and regulatory violations.
            </p>
            <p>
              Our intelligent system tracks consent, sends automated reminders for consent renewal, and flags opt-out requests 
              in real-time, ensuring continuous adherence to TCPA regulations. Through tamper-proof audit trails and secure 
              access controls, businesses can operate confidently knowing their data handling practices meet the highest 
              standards of security and regulatory compliance.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Security & Compliance Systems</h2>
            <p className="text-lg text-gray-600">
              Our advanced AI mechanisms automatically protect sensitive data, ensure regulatory compliance, 
              and maintain comprehensive security controls that adapt to evolving regulatory requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Advanced AI Security Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Proactive Protection</h4>
                <p className="text-gray-700 text-sm">
                  Our <a href="https://www.callcabinet.com/compliance-redaction-for-phi-pii-and-pci-dss/" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  AI-powered redaction systems</a> automatically protect PII/PHI across all data types, 
                  while <a href="https://www.csgi.com/insights/the-tcpa-trust-factor-what-the-new-rules-mean-for-customer-communications/" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">TCPA compliance automation</a> 
                  ensures continuous adherence to evolving regulatory requirements.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-6 flex items-center justify-center">
                <Database className="h-20 w-20 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">AI Security Command Center</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive security dashboard displaying AI monitoring data flows, automatically redacting sensitive 
                information, tracking consent status across all channels, and maintaining real-time compliance status 
                with detailed audit trails and automated regulatory reporting capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Framework */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Regulatory Coverage</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform ensures complete compliance across all major data protection and privacy regulations, 
              automatically adapting to regulatory changes and maintaining continuous protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">GDPR Compliance</h3>
              <p className="text-gray-600 text-sm">Automated data mapping, consent management, and right to be forgotten implementation</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-teal-100 p-3 rounded-lg w-fit mb-4">
                <Lock className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">TCPA Protection</h3>
              <p className="text-gray-600 text-sm">Real-time consent tracking, automated opt-out processing, and communication compliance</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
                <FileCheck className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">HIPAA Security</h3>
              <p className="text-gray-600 text-sm">PHI protection, access controls, and comprehensive audit trails for healthcare data</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">CCPA Compliance</h3>
              <p className="text-gray-600 text-sm">Consumer privacy rights, data transparency, and automated deletion processes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Measurable Security Benefits</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your security posture with AI-driven compliance that delivers risk mitigation, operational efficiency, 
              and customer trust through intelligent automation and proactive protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-3 rounded-lg w-fit mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-50 to-teal-50 p-8 rounded-xl border border-blue-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Adaptive Compliance in Dynamic Regulatory Environment</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                The sheer volume and variety of data, coupled with constantly evolving regulatory requirements, make compliance 
                a continuously moving target. Our <a href="https://www.madisonlogic.com/blog/intent-data-security/" 
                target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                AI-powered security solutions</a> centralize data management, automate complex compliance checks, 
                and generate immutable audit trails that adapt to new regulations without extensive re-engineering.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This approach transforms compliance from a burdensome obligation into a distinct competitive advantage, 
                freeing up valuable resources for core business activities while ensuring confident, agile operations 
                within a complex legal environment. Businesses can focus on growth knowing their data practices exceed 
                regulatory requirements and customer expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Excellence Visualized</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <AlertTriangle className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Threat Detection</h3>
              <p className="text-sm text-gray-600">
                Advanced monitoring interface displaying AI scanning data flows in real-time, automatically identifying 
                and flagging potential PII/PHI exposure, consent violations, and security threats with immediate 
                remediation recommendations and automated response protocols.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <FileCheck className="h-16 w-16 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compliance Dashboard</h3>
              <p className="text-sm text-gray-600">
                Comprehensive compliance overview showing real-time status across GDPR, TCPA, HIPAA, and CCPA requirements, 
                with automated reporting, audit trail summaries, and predictive compliance risk assessments for 
                proactive regulatory management and continuous improvement.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Lock className="h-16 w-16 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Protection Visualization</h3>
              <p className="text-sm text-gray-600">
                Interactive data flow diagram showing AI-powered redaction processes across multiple data types, 
                encryption protocols, access control enforcement, and consent management workflows with 
                real-time security status indicators and automated protection verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Secure Your Business Operations?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Transform your security and compliance posture with AI-powered protection that delivers automatic data redaction, 
            regulatory compliance, and comprehensive audit trails. Operate with confidence in today's regulated environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Secure Your Data Now
            </Link>
            <Link 
              to="/services/analytics-reporting"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore Analytics & Reporting
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};